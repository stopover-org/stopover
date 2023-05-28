import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { myFirm_FirmQuery } from "./__generated__/myFirm_FirmQuery.graphql";
import Layout from "../../components/MainPage/Layout";
import FirmScene from "../../scenes/firms/FirmScene";
import SidebarContent from "../../lib/shared/SidebarContent";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../lib/shared/AuthGuard";

const Query = graphql`
  query myFirm_FirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          ...FirmScene_FirmFragment
          id
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Index = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, myFirm_FirmQuery>) => {
  const { currentUser } = usePreloadedQuery<myFirm_FirmQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.id)}
        redirectTo="/firms/new"
      >
        <SidebarContent>
          <FirmScene firmFragmentRef={currentUser?.account?.firm!} />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Index, Query, {
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
