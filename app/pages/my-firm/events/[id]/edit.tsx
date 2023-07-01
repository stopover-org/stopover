import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "../../../../components/MainPage/Layout";
import AuthGuard from "../../../../components/shared/AuthGuard";
import SidebarContent from "../../../../components/shared/SidebarContent";
import { getClientEnvironment } from "../../../../lib/clientEnvironment";
import { IApiKeys } from "../../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../../lib/hooks/useUpdateApiKeys";
import EditEventScene from "../../../../scenes/firms/events/EditEventScene";
import { edit_FirmEventQuery } from "./__generated__/edit_FirmEventQuery.graphql";

const Query = graphql`
  query edit_FirmEventQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          event(id: $id) {
            id
            ...EditEventScene_EventFragment
          }
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
}: RelayProps<Props, edit_FirmEventQuery>) => {
  const { currentUser } = usePreloadedQuery<edit_FirmEventQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard accessible={Boolean(currentUser?.account?.firm?.event?.id)}>
        <SidebarContent>
          <EditEventScene
            eventFragmentRef={currentUser!.account?.firm?.event!}
          />
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
  serverSideProps: async (ctx) => ({
    id: +ctx.query.id!,
    apiKeys: fetchEnvVariables(),
  }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
