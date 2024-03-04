import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/joy";
import { BookingEditForm_FirmBookingFragment$key } from "artifacts/BookingEditForm_FirmBookingFragment.graphql";
import BookingDatesEditForm from "./BookingDatesEditForm";

interface BookingEditFormProps {
  bookingFragmentRef: BookingEditForm_FirmBookingFragment$key;
  onClose: () => void;
}

const BookingEditForm = ({
  bookingFragmentRef,
  onClose,
}: BookingEditFormProps) => {
  const booking = useFragment<BookingEditForm_FirmBookingFragment$key>(
    graphql`
      fragment BookingEditForm_FirmBookingFragment on Booking {
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
        eventOptions {
          status
        }
        ...BookingDatesEditForm_FirmBookingFragment
      }
    `,
    bookingFragmentRef
  );

  return (
    <Grid container spacing={0}>
      <Grid lg={12} md={12}>
        <BookingDatesEditForm bookingFragmentRef={booking} onClose={onClose} />
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingEditForm);
