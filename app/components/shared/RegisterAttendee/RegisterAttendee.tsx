import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRegisterAttendeeForm } from "./useRegisterAttendeeForm";
import { RegisterAttendee_AttendeeFragment$key } from "../../../artifacts/RegisterAttendee_AttendeeFragment.graphql";

interface RegisterAttendeeProps {
  attendeeFragmentRef: RegisterAttendee_AttendeeFragment$key;
}

const RegisterAttendee = ({ attendeeFragmentRef }: RegisterAttendeeProps) => {
  const attendee = useFragment(
    graphql`
      fragment RegisterAttendee_AttendeeFragment on Attendee {
        ...useRegisterAttendeeForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useRegisterAttendeeForm(attendee);
  return (
    <form onSubmit={form.handleSubmit()}>
      <IconButton size="sm" sx={{ marginRight: "10px" }} type="submit">
        <Tooltip title="Register attendee">
          <PersonAddIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(RegisterAttendee);
