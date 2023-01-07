import moment from "moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import styled from "styled-components";
import { BookingList_BookingsFragment$key } from "./__generated__/BookingList_BookingsFragment.graphql";
import { isDifferentDayMonth, getDayMonth } from "../../../lib/utils/dates";
import { TypographySize, TypographyTags } from "../../StatesEnum";
import Booking from "../Booking";
import Typography from "../../Typography";

const BookingPadding = styled.div`
  padding-top: 30px;
`;

const BookingList = ({
  bookingReference,
}: {
  bookingReference: BookingList_BookingsFragment$key;
}) => {
  const data = useFragment(
    graphql`
      fragment BookingList_BookingsFragment on Query
      @argumentDefinitions(tripId: { type: "ID!" }) {
        bookings(id: $tripId) {
          id
          bookedFor
          ...Booking_BookingsFragment
        }
      }
    `,
    bookingReference
  );
  return (
    <div>
      {data?.bookings?.length
        ? data?.bookings?.map((item, index) => {
            if (
              (index !== 0 &&
                isDifferentDayMonth(
                  moment(item.bookedFor),
                  moment(data?.bookings?.[index - 1].bookedFor)
                )) ||
              index === 0
            ) {
              return (
                <BookingPadding key={index}>
                  <Typography size={TypographySize.H3} as={TypographyTags.H3}>
                    {getDayMonth(moment(item.bookedFor))}
                  </Typography>
                  <Booking bookingReference={item} />
                </BookingPadding>
              );
            }
            return (
              <BookingPadding key={index}>
                <Booking bookingReference={item} />
              </BookingPadding>
            );
          })
        : null}
    </div>
  );
};
export default BookingList;
