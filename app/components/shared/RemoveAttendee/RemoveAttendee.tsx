import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRemoveAttendeeForm } from "./useRemoveAttendeeForm";
import { RemoveAttendee_AttendeeFragment$key } from "../../../artifacts/RemoveAttendee_AttendeeFragment.graphql";

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
      <IconButton
        color="danger"
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
      >
        <Tooltip title="Remove this attendee and refund it">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(RemoveAttendee);
