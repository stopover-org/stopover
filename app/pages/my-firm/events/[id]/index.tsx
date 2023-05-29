import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "../../../../components/MainPage/Layout";
import AuthGuard from "../../../../lib/shared/AuthGuard";
import SidebarContent from "../../../../lib/shared/SidebarContent";
import { getClientEnvironment } from "../../../../lib/clientEnvironment";
import { IApiKeys } from "../../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../../lib/hooks/useUpdateApiKeys";
import { Id_FirmEventQuery } from "./__generated__/Id_FirmEventQuery.graphql";

const Query = graphql`
  query Id_FirmEventQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          event(id: $id) {
            id
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

  console.log(currentUser);

  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.event?.id)}
        redirectTo="/my-firm/events"
      >
        <SidebarContent>Event Scene</SidebarContent>
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
      "../../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
