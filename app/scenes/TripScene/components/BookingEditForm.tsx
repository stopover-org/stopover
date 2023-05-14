import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/joy";
import AttendeeEditForm from "./AttendeeEditForm";
import { BookingEditForm_BookingFragment$key } from "./__generated__/BookingEditForm_BookingFragment.graphql";
import BookingOptionsEditForm from "./BookingOptionsEditForm";
import BookingDatesEditForm from "./BookingDatesEditForm";
import CheckoutForm from "./CheckoutForm";

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
      }
    `,
    bookingFragmentRef
  );

  return (
    <Grid container>
      <Grid xs={7}>
        {booking.attendees.map((attendee) => (
          <AttendeeEditForm key={attendee.id} attendeeFragmentRef={attendee} />
        ))}
        <BookingDatesEditForm bookingFragmentRef={booking} />
      </Grid>
      <Grid xs={5}>
        <BookingOptionsEditForm bookingFragmentRef={booking} />
        <CheckoutForm bookingFragmentRef={booking} />
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingEditForm);
