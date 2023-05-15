import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box, Grid } from "@mui/joy";
import AttendeeEditForm from "./AttendeeEditForm";
import { BookingEditForm_BookingFragment$key } from "./__generated__/BookingEditForm_BookingFragment.graphql";
import BookingOptionsEditForm from "./BookingOptionsEditForm";
import BookingDatesEditForm from "./BookingDatesEditForm";
import CheckoutForm from "./CheckoutForm";
import CancelBookingForm from "./CancelBookingForm";

interface BookingEditFormProps {
  bookingFragmentRef: BookingEditForm_BookingFragment$key;
}

const BookingEditForm = ({ bookingFragmentRef }: BookingEditFormProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingEditForm_BookingFragment on Booking {
        id
        attendees {
          id
          ...AttendeeEditForm_AttendeeFragment
        }
        ...BookingDatesEditForm_BookingFragment
        ...BookingOptionsEditForm_BookingFragment
        ...CheckoutForm_BookingFragmentRef
        ...CancelBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  return (
    <Grid container spacing={2}>
      <Grid xs={7}>
        {booking.attendees.map((attendee) => (
          <AttendeeEditForm key={attendee.id} attendeeFragmentRef={attendee} />
        ))}
        <Grid xs={12}>
          <BookingDatesEditForm bookingFragmentRef={booking} />
        </Grid>
        <Grid xs={12}>
          <CancelBookingForm bookingFragmentRef={booking} />
        </Grid>
      </Grid>
      <Grid xs={5}>
        <BookingOptionsEditForm bookingFragmentRef={booking} />
        <CheckoutForm bookingFragmentRef={booking} />
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingEditForm);
