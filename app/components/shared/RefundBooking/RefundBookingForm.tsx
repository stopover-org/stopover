import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { RefundBookingForm_BookingFragment$key } from "artifacts/RefundBookingForm_BookingFragment.graphql";
import SubmitButton from "../SubmitButton";
import { useRefundBookingForm } from "./useRefundBookingForm";

interface RefundBookingFormProps {
  bookingFragmentRef: RefundBookingForm_BookingFragment$key;
  onSuccess: () => void;
}

const RefundBookingForm = ({
  bookingFragmentRef,
  onSuccess,
}: RefundBookingFormProps) => {
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
  const form = useRefundBookingForm(booking, onSuccess);
  const disabled = React.useMemo(
    () =>
      booking.status === "cancelled" ||
      moment(booking.schedule.scheduledFor).isBefore(new Date()),
    [booking.status]
  );
  const { t } = useTranslation();
  if (disabled) return null;
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        variant="plain"
        color="danger"
        size="sm"
        submitting={form.formState.isSubmitting}
      >
        {t("forms.refundBooking.action")}
      </SubmitButton>
    </form>
  );
};

export default React.memo(RefundBookingForm);
