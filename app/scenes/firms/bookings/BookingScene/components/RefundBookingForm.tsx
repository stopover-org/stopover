import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import { useRefundBookingForm } from "./useRefundBookingForm";
import { RefundBookingForm_BookingFragment$key } from "../../../../../artifacts/RefundBookingForm_BookingFragment.graphql";

interface RefundBookingFormProps {
  bookingFragmentRef: RefundBookingForm_BookingFragment$key;
}

const RefundBookingForm = ({ bookingFragmentRef }: RefundBookingFormProps) => {
  const booking = useFragment<RefundBookingForm_BookingFragment$key>(
    graphql`
      fragment RefundBookingForm_BookingFragment on Booking {
        status
        id
        schedule {
          scheduledFor
        }
        ...useRefundBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useRefundBookingForm(booking);
  const disabled = React.useMemo(
    () =>
      booking.status === "cancelled" ||
      moment(booking.schedule.scheduledFor).isBefore(new Date()),
    [booking.status]
  );
  if (disabled) return null;
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        variant="plain"
        color="danger"
        size="sm"
        submitting={form.formState.isSubmitting}
      >
        Refund This Booking
      </SubmitButton>
    </form>
  );
};

export default React.memo(RefundBookingForm);
