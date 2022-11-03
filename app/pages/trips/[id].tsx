import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import Booking from "../../components/Trips/Booking";
import { getClientEnvironment } from "../../lib/clientEnvironment";

const Query = graphql`
  query Id_TripsQuery($id: ID!) {
    bookings(id: $id) {
      id
      bookedFor
      event {
        title
        durationTime
        description
        images
      }
    }
  }
`;

const Trip = ({ preloadedQuery }: any) => {
  const query = usePreloadedQuery(Query, preloadedQuery);
  return (
    <Layout>
      {query.bookings.map((_: any, index: number) => (
        <Booking eventsReference={query.bookings[index]} />
      ))}
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
