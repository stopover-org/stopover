import { graphql, useFragment } from "react-relay";
import React from "react";
import { useRemoveAttendeeForm } from "./useRemoveAttendeeForm";
import { RemoveAttendee_AttendeeFragment$key } from "../../../artifacts/RemoveAttendee_AttendeeFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  attendeeFragmentRef: RemoveAttendee_AttendeeFragment$key;
  onSuccess: () => void;
}

const RemoveAttendee = ({
  attendeeFragmentRef,
  onSuccess,
}: RegisterAttendeeProps) => {
  const attendee = useFragment<RemoveAttendee_AttendeeFragment$key>(
    graphql`
      fragment RemoveAttendee_AttendeeFragment on Attendee {
        ...useRemoveAttendeeForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useRemoveAttendeeForm(attendee, onSuccess);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        size="sm"
        color="danger"
      >
        Remove Attendee
      </SubmitButton>
    </form>
  );
};

export default React.memo(RemoveAttendee);
