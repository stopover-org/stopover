import { graphql, useFragment } from "react-relay";
import React from "react";
import Typography from "../../../../../components/v2/Typography";
import { CancelBookingForm_BookingFragment$key } from "../../../../../artifacts/CancelBookingForm_BookingFragment.graphql";
import { useCancelBookingForm } from "./useCancelBookingForm";
import Button from "../../../../../components/v2/Button";
import SubmitButton from "../../../../../components/shared/SubmitButton";

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
  const disabled = React.useMemo(
    () => booking.status !== "active",
    [booking.status]
  );
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        disabled={disabled}
        variant="plain"
        color="danger"
        size="sm"
        submitting={form.formState.isSubmitting}
      >
        Cancel This Booking
      </SubmitButton>
    </form>
  );
};

export default React.memo(CancelBookingForm);
