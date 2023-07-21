import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useChangeEventOptionAvailabilityForm } from "./useChangeEventOptionAvailabilityForm";
import { ChangeEventOptionAvailability_EventOptionFragment$key } from "../../../artifacts/ChangeEventOptionAvailability_EventOptionFragment.graphql";

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
      <IconButton
        color="danger"
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
      >
        <Tooltip title="Change Availability">
          <DoNotDisturbIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(ChangeEventOptionAvailability);
