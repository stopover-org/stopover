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
import EventScene from "../../../../scenes/firms/events/EventScene";
import { Id_FirmEventQuery } from "../../../../artifacts/Id_FirmEventQuery.graphql";

const Query = graphql`
  query Id_FirmEventQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      ...EventScene_CurrentUserFragment
      account {
        firm {
          event(id: $id) {
            id
            ...EventScene_FirmEventFragment
          }
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
}: RelayProps<Props, Id_FirmEventQuery>) => {
  const { currentUser } = usePreloadedQuery<Id_FirmEventQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.event?.id)}
        redirectTo="/my-firm/events"
      >
        <SidebarContent>
          <EventScene
            eventFragmentRef={currentUser?.account?.firm?.event!}
            currentUserFragmentRef={currentUser!}
          />
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
