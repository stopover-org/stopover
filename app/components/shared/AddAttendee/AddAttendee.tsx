import { graphql, useFragment } from "react-relay";
import React from "react";
import { useAddAttendeeForm } from "./useAddAttendeeForm";
import { AddAttendee_BookingFragment$key } from "../../../artifacts/AddAttendee_BookingFragment.graphql";
import SubmitButton from "../SubmitButton";

interface AddAttendeeProps {
  bookingFragmentRef: AddAttendee_BookingFragment$key;
}

const AddAttendee = ({ bookingFragmentRef }: AddAttendeeProps) => {
  const booking = useFragment(
    graphql`
      fragment AddAttendee_BookingFragment on Booking {
        ...useAddAttendeeForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useAddAttendeeForm(booking);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        sx={{ marginRight: "10px" }}
        color="neutral"
        submitting={form.formState.isSubmitting}
      >
        Add Attendee
      </SubmitButton>
    </form>
  );
};

export default React.memo(AddAttendee);
