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
        durationTime
      }
    }
  }
`;

const Trip = ({ preloadedQuery }: any) => {
  const data = usePreloadedQuery(Query, preloadedQuery);
  console.log(data.bookings[0].bookedFor, data.bookings[0].id);
  return (
    <Layout>
      <Booking duration={data.bookings[0].event.durationTime} />
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
