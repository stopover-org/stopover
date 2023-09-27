import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { Divider, Grid } from "@mui/joy";
import AttendeeEditForm from "./AttendeeEditForm";
import { BookingEditForm_BookingFragment$key } from "../../../../../artifacts/BookingEditForm_BookingFragment.graphql";
import BookingOptionsEditForm from "./BookingOptionsEditForm";
import BookingDatesEditForm from "./BookingDatesEditForm";
import CheckoutForm from "./CheckoutForm";
import Button from "../../../../../components/v2/Button";
import CancelBookingModal from "./CancelBookingModal";
import useSubscription from "../../../../../lib/hooks/useSubscription";

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
        ...CancelBookingModal_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  useSubscription({
    variables: { bookingId: booking.id },
    subscription: graphql`
      subscription BookingEditForm_BookingChangedSubscription($bookingId: ID!) {
        bookingChanged(bookingId: $bookingId) {
          booking {
            ...BookingEditForm_BookingFragment
          }
        }
      }
    `,
  });

  const [modal, setModal] = React.useState(false);
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
      !leftToPay,
    [booking.status, booking.bookedFor, leftToPay]
  );
console.log(booking.status, booking.bookedFor, moment(booking.bookedFor).isBefore(new Date()), leftToPay, disabled)

  return (
    <>
      <Grid container spacing={2}>
        <Grid lg={7} md={12}>
          {booking.attendees.map((attendee) => (
            <AttendeeEditForm
              key={attendee.id}
              attendeeFragmentRef={attendee}
            />
          ))}
          <Divider />
          <Grid md={12} sx={{lg: {display: 'none'}}}>
            <BookingOptionsEditForm bookingFragmentRef={booking} />
            {!disabled && <CheckoutForm bookingFragmentRef={booking} />}
          </Grid>
          <>
            <Grid xs={12}>
              <BookingDatesEditForm bookingFragmentRef={booking} />
            </Grid>

            {booking.status !== "cancelled" && (
              <Grid xs={12}>
                <Button size="sm" color="danger" onClick={() => setModal(true)}>
                  Cancel Booking
                </Button>
              </Grid>
            )}
          </>
        </Grid>
        <Grid lg={5} sx={{md: {display: 'none'}}}>
          <BookingOptionsEditForm bookingFragmentRef={booking} />
          {!disabled && <CheckoutForm bookingFragmentRef={booking} />}
        </Grid>
      </Grid>
      <CancelBookingModal
        open={modal}
        onClose={() => setModal(false)}
        bookingFragmentRef={booking}
      />
    </>
  );
};

export default React.memo(BookingEditForm);
