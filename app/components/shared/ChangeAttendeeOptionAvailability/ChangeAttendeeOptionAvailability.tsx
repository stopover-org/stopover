import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useChangeAttendeeOptionAvailabilityForm } from "./useChangeAttendeeOptionAvailabilityForm";
import { ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key } from "../../../artifacts/ChangeAttendeeOptionAvailability_AttendeeOptionFragment.graphql";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key;
}

const ChangeAttendeeOptionAvailability = ({
  optionFragmentRef,
}: RegisterAttendeeProps) => {
  const attendeeOption =
    useFragment<ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key>(
      graphql`
        fragment ChangeAttendeeOptionAvailability_AttendeeOptionFragment on AttendeeOption {
          ...useChangeAttendeeOptionAvailabilityForm_AttendeeOption
        }
      `,
      optionFragmentRef
    );
  const form = useChangeAttendeeOptionAvailabilityForm(attendeeOption);
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

export default React.memo(ChangeAttendeeOptionAvailability);
