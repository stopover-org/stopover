import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import SidebarContent from "../../components/shared/SidebarContent";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import EditFirmScene from "../../scenes/firms/EditFirmScene";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../components/shared/AuthGuard";
import { editFirm_FirmQuery } from "../../artifacts/editFirm_FirmQuery.graphql";

const Query = graphql`
  query editFirm_FirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          ...EditFirmScene_FirmFragment
          id
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Edit = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, editFirm_FirmQuery>) => {
  const { currentUser } = usePreloadedQuery<editFirm_FirmQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={currentUser}>
      <AuthGuard
        accessible={Boolean(currentUser.account.firm?.id)}
        redirectTo="/firms/new"
      >
        <SidebarContent accountFragmentRef={currentUser.account}>
          <EditFirmScene firmFragmentRef={currentUser.account.firm!} />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Edit, Query, {
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
