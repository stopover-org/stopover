import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useChangeEventOptionAvailabilityForm } from "./useChangeEventOptionAvailabilityForm";
import { ChangeEventOptionAvailability_EventOptionFragment$key } from "../../../artifacts/ChangeEventOptionAvailability_EventOptionFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeEventOptionAvailability_EventOptionFragment$key;
}

const ChangeEventOptionAvailability = ({
  optionFragmentRef,
}: RegisterAttendeeProps) => {
  const eventOption =
    useFragment<ChangeEventOptionAvailability_EventOptionFragment$key>(
      graphql`
        fragment ChangeEventOptionAvailability_EventOptionFragment on EventOption {
          ...useChangeEventOptionAvailabilityForm_EventOption
        }
      `,
      optionFragmentRef
    );
  const form = useChangeEventOptionAvailabilityForm(eventOption);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        icon
        size="sm"
        color="danger"
      >
        <Tooltip title="Change Availability">
          <DoNotDisturbIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(ChangeEventOptionAvailability);
