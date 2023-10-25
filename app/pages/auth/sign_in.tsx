import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import React from "react";
import SignInScene from "../../scenes/Auth/SignInScene";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import Layout from "../../components/MainPage/Layout";
import AuthGuard from "../../components/shared/AuthGuard/AuthGuard";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { signIn_Query } from "../../artifacts/signIn_Query.graphql";

const Query = graphql`
  query signIn_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      status
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const SignIn = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, signIn_Query>) => {
  const { currentUser } = usePreloadedQuery<signIn_Query>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={currentUser}>
      <AuthGuard accessible={currentUser.status === "temporary"} redirectTo="/">
        <SignInScene />
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(SignIn, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: null,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async () => ({
    apiKeys: fetchEnvVariables(),
  }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
