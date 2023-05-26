import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import { trips_Query } from "./__generated__/trips_Query.graphql";
import TripsScene from "../../scenes/TripsScene";

const Query = graphql`
  query trips_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...TripsScene_AccountFragment
      }
    }
  }
`;

const Trips = ({ preloadedQuery }: RelayProps<{}, trips_Query>) => {
  const data = usePreloadedQuery(Query, preloadedQuery);

  return (
    <Layout currentUserFragment={data.currentUser!}>
      {/* <EventsScene eventsFragmentRef={data} /> */}
      <TripsScene accountFragmentRef={data.currentUser?.account!} />
    </Layout>
  );
};

export default withRelay(Trips, Query, {
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
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
