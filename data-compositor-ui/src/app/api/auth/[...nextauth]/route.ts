import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider, {
  KeycloakProfile,
} from "next-auth/providers/keycloak";
import { OAuthConfig } from "next-auth/providers/oauth";
import { JWT } from "next-auth/jwt";

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
      return token;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === "keycloak") {
        const issuerUrl = (
          authOptions.providers.find(
            (p) => p.id === "keycloak",
          ) as OAuthConfig<KeycloakProfile>
        ).options!.issuer!;

        const logOutUrl = new URL(
          `${issuerUrl}/protocol/openid-connect/logout`,
        );

        logOutUrl.searchParams.set(
          "id_token_hint",
          (token as Record<string, any>)?.id_token!,
        );

        await fetch(logOutUrl);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
