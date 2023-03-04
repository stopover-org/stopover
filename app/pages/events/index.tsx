import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import { events_Query } from "./__generated__/events_Query.graphql";
import EventsListScene from "../../scenes/EventsListScene";

const Query = graphql`
  query events_Query($filters: EventsFilter) {
    ...EventsListScene_EventsFragment @arguments(filters: $filters)
    ...EventsListScene_InterestsFragment
  }
`;

const Home = ({ preloadedQuery }: RelayProps<{}, events_Query>) => {
  const query = usePreloadedQuery(Query, preloadedQuery);

  return (
    <Layout>
      <EventsListScene eventsReference={query} />
    </Layout>
  );
};

export default withRelay(Home, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async () => ({}),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment();
  },
});
