import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/joy";
import AttendeeEditForm from "./AttendeeEditForm";
import { BookingEditForm_BookingFragment$key } from "./__generated__/BookingEditForm_BookingFragment.graphql";
import BookingOptionsEditForm from "./BookingOptionsEditForm";

interface BookingEditFormProps {
  bookingFragmentRef: BookingEditForm_BookingFragment$key;
}

const BookingEditForm = ({ bookingFragmentRef }: BookingEditFormProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingEditForm_BookingFragment on Booking {
        id
        attendees {
          ...AttendeeEditForm_AttendeeFragment
        }
        ...BookingOptionsEditForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  return (
    <form>
      <Grid container>
        <Grid xs={7}>
          {booking.attendees.map((attendee) => (
            <AttendeeEditForm attendeeFragmentRef={attendee} />
          ))}
        </Grid>
        <Grid xs={5}>
          <BookingOptionsEditForm bookingFragmentRef={booking} />
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(BookingEditForm);
