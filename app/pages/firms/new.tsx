import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import CreateFirmScene from "../../scenes/firms/CreateFirmScene";
import Layout from "../../components/MainPage/Layout";
import Loading from "../../components/v2/Loading";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../components/shared/AuthGuard";
import { new_NewFirmQuery } from "../../artifacts/new_NewFirmQuery.graphql";

const Query = graphql`
  query new_NewFirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        id
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
  CSN,
}: RelayProps<Props, new_NewFirmQuery>) => {
  const { currentUser } = usePreloadedQuery<new_NewFirmQuery>(
    Query,
    preloadedQuery
  );
  const currentFirmId = currentUser.account.firm?.id;

  useUpdateApiKeys(apiKeys);

  return (
    <AuthGuard
      accessible={Boolean(currentUser.account.id) && !currentFirmId}
      redirectTo={currentUser.account.id ? "/my-firm" : "/auth/sign_in"}
    >
      <Layout
        currentUserFragment={currentUser}
        showRegisterFirm={false}
        CSN={CSN}
      >
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
