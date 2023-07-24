import { graphql, useFragment } from "react-relay";
import React from "react";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import { Tooltip } from "@mui/joy";
import { useDeregisterAttendeeForm } from "./useDeregisterAttendeeForm";
import { DeregisterAttendee_AttendeeFragment$key } from "../../../artifacts/DeregisterAttendee_AttendeeFragment.graphql";
import SubmitButton from "../SubmitButton";

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
      <SubmitButton submitting={form.formState.isSubmitting} icon size="sm">
        <Tooltip title="Deregister attendee">
          <PersonAddDisabledIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(DeregisterAttendee);
