import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { withRelay } from "relay-nextjs";
import styled from "styled-components";
import moment from "moment";
import Layout from "../../components/MainPage/Layout";
import Booking from "../../components/Trips/Booking";
import Typography from "../../components/Typography";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { TypographySize, TypographyTags } from "../../components/StatesEnum";

const BookingPadding = styled.div`
  padding-top: 30px;
`;

const TextPadding = styled.div`
  padding-top: 10px;
`;

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
      <>
        <Typography size={TypographySize.H1} as={TypographyTags.H1}>
          Моя поездка в Брно
        </Typography>
        <TextPadding>
          <Typography size={TypographySize.H2} as={TypographyTags.H2}>
            {`${moment(query.bookings[0].event.bookedFor).format(
              "DD.MMMM"
            )} - ${moment(
              query.bookings[query.bookings.length - 1].event.bookedFor
            ).format("DD.MMMM")}`}
          </Typography>
        </TextPadding>
        {query.bookings.map((_: any, index: number) => {
          if (
            moment(query.bookings[index].event.bookedFor).diff(
              moment(query.bookings[index + 1]),
              "d"
            ) !== 0 ||
            index === 0
          ) {
            return (
              <BookingPadding key={index}>
                <Typography size={TypographySize.H3} as={TypographyTags.H3}>
                  {moment(query.bookings[index].event.bookedFor).format(
                    "DD.MMMM"
                  )}
                </Typography>
                <Booking eventsReference={query.bookings[index]} />
              </BookingPadding>
            );
          }
          return (
            <BookingPadding key={index}>
              <Booking eventsReference={query.bookings[index]} />
            </BookingPadding>
          );
        })}
      </>
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
