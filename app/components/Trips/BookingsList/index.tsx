import React from "react";
import { graphql, useFragment } from "react-relay";
// import { BookingsList_Fragment$key } from "./__generated__/BookingsList_Fragment.graphql";
// import styled from "styled-components";

const BookingsList = ({ bookingReference }: any) => {
  console.log(bookingReference);

  const data = useFragment(
    graphql`
      fragment BookingsList_BookingsFragment on Query
      @argumentDefinitions(id: { type: "ID!" }) {
        bookings(id: $id) {
          bookedFor
          id
        }
      }
    `,
    bookingReference
  );

  console.log(data);
  return <div>გამარჯობა</div>;
};
export default BookingsList;
