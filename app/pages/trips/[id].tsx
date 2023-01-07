import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { Id_TripsQuery } from "./__generated__/Id_TripsQuery.graphql";
import TripCard from "../../components/Trips/TripCard";

const Query = graphql`
  query Id_TripsQuery($id: ID!) {
    ...BookingList_BookingsFragment @arguments(tripId: $id)
    ...TripHeader_BookingsFragment @arguments(tripId: $id)
  }
`;

const Trip = ({ preloadedQuery }: any) => {
  const data = usePreloadedQuery<Id_TripsQuery>(Query, preloadedQuery);
  return (
    <Layout>
      <TripCard queryReference={data} />
    </Layout>
  );
};

export default withRelay(Trip, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: null,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => ({
    id: +ctx.query.id!,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment();
  },
});
