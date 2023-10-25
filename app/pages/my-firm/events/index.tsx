import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "../../../components/MainPage/Layout";
import AuthGuard from "../../../components/shared/AuthGuard";
import SidebarContent from "../../../components/shared/SidebarContent";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import EventsScene from "../../../scenes/firms/events/EventsScene";
import { events_FirmEventsQuery } from "../../../artifacts/events_FirmEventsQuery.graphql";

const Query = graphql`
  query events_FirmEventsQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...EventsScene_FirmFragment
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
}: RelayProps<Props, events_FirmEventsQuery>) => {
  const { currentUser } = usePreloadedQuery<events_FirmEventsQuery>(
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
          <EventsScene firmFragmentRef={currentUser.account.firm!} />
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
