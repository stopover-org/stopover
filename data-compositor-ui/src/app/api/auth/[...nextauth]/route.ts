import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider, {
  KeycloakProfile,
} from "next-auth/providers/keycloak";
import { OAuthConfig } from "next-auth/providers/oauth";
import { signOut } from "next-auth/react";
import { JWT } from "next-auth/jwt";

function parseJwt(token?: string) {
  if (!token) {
    return null;
  }
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

async function signOutKeycloak(token: JWT) {
  const issuerUrl =
    // prettier-ignore
    (
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      authOptions.providers.find(
        (p) => p.id === "keycloak",
      ) as OAuthConfig<KeycloakProfile>
    ).options!.issuer!;
  const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);

  logOutUrl.searchParams.set("id_token_hint", token.id_token as string);

  await fetch(logOutUrl);
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;

        token.provider = account.provider;
      }
      const additional = parseJwt(token.id_token as string) || {};

      token = { ...additional, ...token };

      if (
        !(token.groups as string[])
          .map((group: string) => group.toLowerCase())
          .includes("/analyst")
      ) {
        await signOutKeycloak(token);

        await signOut();
        return {};
      }

      return token;
    },
  },
  events: {
    async signOut({ token }) {
      if (token.provider === "keycloak") {
        await signOutKeycloak(token);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
