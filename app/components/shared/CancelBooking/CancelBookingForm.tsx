import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CancelBookingForm_BookingFragment$key } from "../../../artifacts/CancelBookingForm_BookingFragment.graphql";
import { useCancelBookingForm } from "./useCancelBookingForm";
import SubmitButton from "../SubmitButton";

interface CancelBookingFormProps {
  bookingFragmentRef: CancelBookingForm_BookingFragment$key;
  onSuccess: () => void;
}

const CancelBookingForm = ({
  bookingFragmentRef,
  onSuccess,
}: CancelBookingFormProps) => {
  const { t } = useTranslation();
  const booking = useFragment<CancelBookingForm_BookingFragment$key>(
    graphql`
      fragment CancelBookingForm_BookingFragment on Booking {
        status
        id
        schedule {
          scheduledFor
        }
        ...useCancelBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCancelBookingForm(booking, onSuccess);
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
        {t("scenes.attendees.trips.tripScene.cancelBookingModal.confirm")}
      </SubmitButton>
    </form>
  );
};

export default React.memo(CancelBookingForm);
