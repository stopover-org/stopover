import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useChangeBookingOptionAvailabilityForm } from "./useChangeBookingOptionAvailabilityForm";
import { ChangeBookingOptionAvailability_BookingOptionFragment$key } from "../../../artifacts/ChangeBookingOptionAvailability_BookingOptionFragment.graphql";

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
      <IconButton
        color="danger"
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
      >
        <Tooltip title="Change Availability">
          <DoNotDisturbIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(ChangeBookingOptionAvailability);
