import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import EventsScene from "../../scenes/attendees/events/EventsScene";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import { events_Query } from "../../artifacts/events_Query.graphql";

const Query = graphql`
  query events_Query {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...EventsScene_EventsPaginationFragment
    ...EventsScene_EventsAutocompleteFragment
    ...EventsScene_InterestsFragment
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Events = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, events_Query>) => {
  const data = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={data.currentUser}>
      <EventsScene eventsFragmentRef={data} />
    </Layout>
  );
};

export default withRelay(Events, Query, {
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
