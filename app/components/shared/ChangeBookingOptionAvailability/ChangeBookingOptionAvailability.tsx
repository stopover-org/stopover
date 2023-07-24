import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useChangeBookingOptionAvailabilityForm } from "./useChangeBookingOptionAvailabilityForm";
import { ChangeBookingOptionAvailability_BookingOptionFragment$key } from "../../../artifacts/ChangeBookingOptionAvailability_BookingOptionFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeBookingOptionAvailability_BookingOptionFragment$key;
}

const ChangeBookingOptionAvailability = ({
  optionFragmentRef,
}: RegisterAttendeeProps) => {
  const bookingOption =
    useFragment<ChangeBookingOptionAvailability_BookingOptionFragment$key>(
      graphql`
        fragment ChangeBookingOptionAvailability_BookingOptionFragment on BookingOption {
          ...useChangeBookingOptionAvailabilityForm_BookingOption
        }
      `,
      optionFragmentRef
    );
  const form = useChangeBookingOptionAvailabilityForm(bookingOption);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        icon
        size="sm"
        color="danger"
      >
        <Tooltip title="Change Availability">
          <DoNotDisturbIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(ChangeBookingOptionAvailability);
