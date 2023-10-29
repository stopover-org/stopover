import { graphql, useFragment } from "react-relay";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAddAttendeeForm } from "./useAddAttendeeForm";
import { AddAttendee_BookingFragment$key } from "../../../artifacts/AddAttendee_BookingFragment.graphql";
import SubmitButton from "../SubmitButton";

interface AddAttendeeProps {
  bookingFragmentRef: AddAttendee_BookingFragment$key;
  onSuccess?: () => void;
}

const AddAttendee = ({
  bookingFragmentRef,
  onSuccess = () => {},
}: AddAttendeeProps) => {
  const booking = useFragment(
    graphql`
      fragment AddAttendee_BookingFragment on Booking {
        ...useAddAttendeeForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useAddAttendeeForm(booking, onSuccess);
  const { t } = useTranslation();
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        sx={{ marginRight: "10px" }}
        submitting={form.formState.isSubmitting}
      >
        {t("forms.addAttendee.action")}
      </SubmitButton>
    </form>
  );
};

export default React.memo(AddAttendee);
