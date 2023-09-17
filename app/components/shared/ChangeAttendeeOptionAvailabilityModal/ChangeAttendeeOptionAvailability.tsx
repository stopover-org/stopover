import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import { useChangeAttendeeOptionAvailabilityForm } from "./useChangeAttendeeOptionAvailabilityForm";
import { ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key } from "../../../artifacts/ChangeAttendeeOptionAvailability_AttendeeOptionFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key;
  onSuccess: () => void;
}

const ChangeAttendeeOptionAvailability = ({
  optionFragmentRef,
  onSuccess,
}: RegisterAttendeeProps) => {
  const attendeeOption =
    useFragment<ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key>(
      graphql`
        fragment ChangeAttendeeOptionAvailability_AttendeeOptionFragment on AttendeeOption {
          status
          ...useChangeAttendeeOptionAvailabilityForm_AttendeeOption
        }
      `,
      optionFragmentRef
    );

  const form = useChangeAttendeeOptionAvailabilityForm(
    attendeeOption,
    onSuccess
  );
  const text = attendeeOption.status === "available" ? "Remove" : "Add";
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        size="sm"
        color={attendeeOption.status === "available" ? "danger" : "success"}
      >
        <Tooltip title="Change Availability">
          <div>{text}</div>
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(ChangeAttendeeOptionAvailability);
