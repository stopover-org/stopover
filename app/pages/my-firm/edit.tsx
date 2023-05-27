import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import SidebarContent from "../../components/MainPage/SidebarContent";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import EditFirmScene from "../../scenes/EditFirmScene";
import { editFirm_FirmQuery } from "./__generated__/editFirm_FirmQuery.graphql";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";

const Query = graphql`
  query editFirm_FirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          ...EditFirmScene_FirmFragment
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
  const data = usePreloadedQuery<editFirm_FirmQuery>(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={data.currentUser!}>
      <SidebarContent>
        <EditFirmScene firmFragmentRef={data.currentUser?.account?.firm!} />
      </SidebarContent>
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
