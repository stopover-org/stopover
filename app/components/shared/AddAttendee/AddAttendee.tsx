import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { useAddAttendeeForm } from "./useAddAttendeeForm";
import { AddAttendee_BookingFragment$key } from "./__generated__/AddAttendee_BookingFragment.graphql";

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
      <Button
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
        color="neutral"
      >
        Add Attendee
      </Button>
    </form>
  );
};

export default React.memo(AddAttendee);
