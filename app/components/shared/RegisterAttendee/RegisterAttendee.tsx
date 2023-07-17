import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
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
      <Button size="sm" sx={{ marginRight: "10px" }} type="submit">
        Register Attendee
      </Button>
    </form>
  );
};

export default React.memo(RegisterAttendee);
