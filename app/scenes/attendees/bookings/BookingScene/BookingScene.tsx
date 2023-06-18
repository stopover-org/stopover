import { graphql, useFragment } from "react-relay";
import React from "react";
import Typography from "../../../../components/v2/Typography";
import { BookingScene_FirmBookingFragment$key } from "./__generated__/BookingScene_FirmBookingFragment.graphql";

interface BookingSceneProps {
  bookingFragmentRef: BookingScene_FirmBookingFragment$key;
}

const BookingScene = ({ bookingFragmentRef }: BookingSceneProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingScene_FirmBookingFragment on Booking {
        id
        status
      }
    `,
    bookingFragmentRef
  );
  return (
    <>
      <Typography>this is my booking</Typography>
      <Typography>{booking.id}</Typography>
    </>
  );
};

export default React.memo(BookingScene);
