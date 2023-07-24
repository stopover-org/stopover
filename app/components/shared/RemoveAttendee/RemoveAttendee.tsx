import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRemoveAttendeeForm } from "./useRemoveAttendeeForm";
import { RemoveAttendee_AttendeeFragment$key } from "../../../artifacts/RemoveAttendee_AttendeeFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  attendeeFragmentRef: RemoveAttendee_AttendeeFragment$key;
}

const RemoveAttendee = ({ attendeeFragmentRef }: RegisterAttendeeProps) => {
  const attendee = useFragment<RemoveAttendee_AttendeeFragment$key>(
    graphql`
      fragment RemoveAttendee_AttendeeFragment on Attendee {
        ...useRemoveAttendeeForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useRemoveAttendeeForm(attendee);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        icon
        size="sm"
        color="danger"
      >
        <Tooltip title="Remove this attendee and refund it">
          <DeleteIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(RemoveAttendee);
