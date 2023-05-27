import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import CreateFirmScene from "../../scenes/CreateFirmScene";
import Layout from "../../components/MainPage/Layout";
import Loading from "../../components/v2/Loading";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { new_NewFirmQuery } from "./__generated__/new_NewFirmQuery.graphql";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../lib/shared/AuthGuard";

const Query = graphql`
  query new_NewFirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          id
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const NewFirm = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, new_NewFirmQuery>) => {
  const { currentUser } = usePreloadedQuery<new_NewFirmQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <AuthGuard
      accessible={!currentUser?.account?.firm?.id}
      redirectTo="/my-firm"
    >
      <Layout currentUserFragment={currentUser!} showRegisterFirm={false}>
        <CreateFirmScene />
      </Layout>
    </AuthGuard>
  );
};

export default withRelay(NewFirm, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
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

    return createServerEnvironment(req!.headers.cookie);
  },
});
