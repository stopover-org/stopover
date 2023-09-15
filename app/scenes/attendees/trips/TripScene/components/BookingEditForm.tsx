import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { Grid } from "@mui/joy";
import AttendeeEditForm from "./AttendeeEditForm";
import { BookingEditForm_BookingFragment$key } from "../../../../../artifacts/BookingEditForm_BookingFragment.graphql";
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
        status
        bookedFor
        paymentType
        leftToPayDepositPrice {
          cents
        }
        leftToPayPrice {
          cents
        }
        attendees(filters: { status: [registered, not_registered] }) {
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

  const leftToPay = React.useMemo(
    () =>
      booking.paymentType === "stripe"
        ? booking.leftToPayPrice.cents
        : booking.leftToPayDepositPrice.cents,
    [booking]
  );

  const disabled = React.useMemo(
    () =>
      booking.status === "cancelled" ||
      moment(booking.bookedFor).isBefore(new Date()) ||
      leftToPay,
    [booking.status, booking.bookedFor, leftToPay]
  );
  return (
    <Grid container spacing={2}>
      <Grid xs={7}>
        {booking.attendees.map((attendee) => (
          <AttendeeEditForm key={attendee.id} attendeeFragmentRef={attendee} />
        ))}
        <>
          <Grid xs={12}>
            <BookingDatesEditForm bookingFragmentRef={booking} />
          </Grid>
          <Grid xs={12}>
            <CancelBookingForm bookingFragmentRef={booking} />
          </Grid>
        </>
      </Grid>
      <Grid xs={5}>
        <BookingOptionsEditForm bookingFragmentRef={booking} />
        {!disabled && <CheckoutForm bookingFragmentRef={booking} />}
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingEditForm);
