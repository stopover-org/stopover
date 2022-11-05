import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { withRelay } from "relay-nextjs";
// import styled from "styled-components";
// import moment from "moment";
import Layout from "../../components/MainPage/Layout";
// import Booking from "../../components/Trips/Booking";
// import Typography from "../../components/Typography";
import { getClientEnvironment } from "../../lib/clientEnvironment";
// import { TypographySize, TypographyTags } from "../../components/StatesEnum";
import { Id_TripsQuery } from "./__generated__/Id_TripsQuery.graphql";
// import { isDifferentDay } from "../../lib/utils/differenceDates";
import BookingsList from "../../components/Trips/BookingsList";
/*
const BookingPadding = styled.div`
  padding-top: 30px;
`;

const TextPadding = styled.div`
  padding-top: 10px;
`;
*/
const Query = graphql`
  query Id_TripsQuery($id: ID!) {
    ...BookingsList_BookingsFragment @arguments(id: $id)
  }
`;

const Trip = ({ preloadedQuery }: any) => {
  const data = usePreloadedQuery<Id_TripsQuery>(Query, preloadedQuery);
  console.log(data.bookings[0].bookedFor, data.bookings[0].id);
  return (
    <Layout>
      <>
        <BookingsList bookingReference={data} />
        {/* <Typography size={TypographySize.H1} as={TypographyTags.H1}>
          Моя поездка в Брно
        </Typography>
        <TextPadding>
          <Typography size={TypographySize.H2} as={TypographyTags.H2}>
            {`${moment(data?.bookings?.[0]?.bookedFor).format(
              "DD.MMMM"
            )} - ${moment(
              data?.bookings?.[data?.bookings.length - 1].bookedFor
            ).format("DD.MMMM")}`}
          </Typography>
        </TextPadding>
        {data?.bookings?.map((_: any, index: number) => {
          if (index !== 0 &&
            isDifferentDay(
              moment(data?.bookings?.[index]?.bookedFor),
              moment(data?.bookings?.[index - 1].bookedFor)
            ) || index === 0
          ) {
            return (
              <BookingPadding key={index}>
                <Typography size={TypographySize.H3} as={TypographyTags.H3}>
                  {moment(data?.bookings[index].bookedFor).format(
                    "DD.MMMM"
                  )}
                </Typography>
                <Booking eventsReference={data.bookings[index]} />
              </BookingPadding>
            );
          }
          return (
            <BookingPadding key={index}>
              <Booking eventsReference={data.bookings[index]} />
            </BookingPadding>
          );
        })} */}
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
