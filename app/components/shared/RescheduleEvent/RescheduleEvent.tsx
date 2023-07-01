import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { useRescheduleEventForm } from "./useRescheduleEventForm";
import { RescheduleEvent_EventFragment$key } from "./__generated__/RescheduleEvent_EventFragment.graphql";

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
      <Button size="sm" sx={{ marginRight: "10px" }} type="submit">
        Reschedule
      </Button>
    </form>
  );
};

export default React.memo(RescheduleEvent);
