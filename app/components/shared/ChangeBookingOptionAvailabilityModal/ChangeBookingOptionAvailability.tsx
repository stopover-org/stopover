import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import { useChangeBookingOptionAvailabilityForm } from "./useChangeBookingOptionAvailabilityForm";
import { ChangeBookingOptionAvailability_BookingOptionFragment$key } from "../../../artifacts/ChangeBookingOptionAvailability_BookingOptionFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeBookingOptionAvailability_BookingOptionFragment$key;
  onSuccess: () => void;
}

const ChangeBookingOptionAvailability = ({
  optionFragmentRef,
  onSuccess,
}: RegisterAttendeeProps) => {
  const bookingOption =
    useFragment<ChangeBookingOptionAvailability_BookingOptionFragment$key>(
      graphql`
        fragment ChangeBookingOptionAvailability_BookingOptionFragment on BookingOption {
          status
          ...useChangeBookingOptionAvailabilityForm_BookingOption
        }
      `,
      optionFragmentRef
    );
  const form = useChangeBookingOptionAvailabilityForm(bookingOption, onSuccess);
  const text = bookingOption.status === "available" ? "Remove" : "Add";
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        size="sm"
        color={bookingOption.status === "available" ? "danger" : "success"}
      >
        <Tooltip title="Change Availability">
          <div>{text}</div>
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(ChangeBookingOptionAvailability);
