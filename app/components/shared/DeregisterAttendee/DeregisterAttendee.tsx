import { graphql, useFragment } from "react-relay";
import React from "react";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import { IconButton, Tooltip } from "@mui/joy";
import { useDeregisterAttendeeForm } from "./useDeregisterAttendeeForm";
import { DeregisterAttendee_AttendeeFragment$key } from "../../../artifacts/DeregisterAttendee_AttendeeFragment.graphql";

interface RegisterAttendeeProps {
  attendeeFragmentRef: DeregisterAttendee_AttendeeFragment$key;
}

const DeregisterAttendee = ({ attendeeFragmentRef }: RegisterAttendeeProps) => {
  const attendee = useFragment<DeregisterAttendee_AttendeeFragment$key>(
    graphql`
      fragment DeregisterAttendee_AttendeeFragment on Attendee {
        ...useDeregisterAttendeeForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useDeregisterAttendeeForm(attendee);
  return (
    <form onSubmit={form.handleSubmit()}>
      <IconButton size="sm" sx={{ marginRight: "10px" }} type="submit">
        <Tooltip title="Deregister attendee">
          <PersonAddDisabledIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(DeregisterAttendee);
