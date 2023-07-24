import { graphql, useFragment } from "react-relay";
import React from "react";
import { useRescheduleEventForm } from "./useRescheduleEventForm";
import { RescheduleEvent_EventFragment$key } from "../../../artifacts/RescheduleEvent_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

interface PublishEventProps {
  eventFragmentRef: RescheduleEvent_EventFragment$key;
}

const RescheduleEvent = ({ eventFragmentRef }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment RescheduleEvent_EventFragment on Event {
        ...useRescheduleEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useRescheduleEventForm(event);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        sx={{ marginRight: "10px" }}
        submitting={form.formState.isSubmitting}
      >
        Reschedule
      </SubmitButton>
    </form>
  );
};

export default React.memo(RescheduleEvent);
