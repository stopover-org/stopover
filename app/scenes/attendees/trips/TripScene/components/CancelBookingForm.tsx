import { graphql, useFragment } from "react-relay";
import React from "react";
import Typography from "../../../../../components/v2/Typography";
import { CancelBookingForm_BookingFragment$key } from "./__generated__/CancelBookingForm_BookingFragment.graphql";
import { useCancelBookingForm } from "./useCancelBookingForm";
import Button from "../../../../../components/v2/Button";

interface CancelBookingFormProps {
  bookingFragmentRef: CancelBookingForm_BookingFragment$key;
}

const CancelBookingForm = ({ bookingFragmentRef }: CancelBookingFormProps) => {
  const booking = useFragment(
    graphql`
      fragment CancelBookingForm_BookingFragment on Booking {
        status
        id
        ...useCancelBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCancelBookingForm(booking);
  const isPaid = React.useMemo(
    () => booking.status === "paid",
    [booking.status]
  );
  return (
    <form onSubmit={form.handleSubmit()}>
      <Button
        disabled={isPaid}
        variant="plain"
        type="submit"
        color="danger"
        size="sm"
      >
        Cancel This Booking
      </Button>
    </form>
  );
};

export default React.memo(CancelBookingForm);
