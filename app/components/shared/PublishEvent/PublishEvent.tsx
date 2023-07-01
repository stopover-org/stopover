import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { PublishEvent_EventFragment$key } from "./__generated__/PublishEvent_EventFragment.graphql";
import { usePublishEventForm } from "./usePublishEventForm";

interface PublishEventProps {
  eventFragmentRef: PublishEvent_EventFragment$key;
}

const PublishEvent = ({ eventFragmentRef }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment PublishEvent_EventFragment on Event {
        ...usePublishEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = usePublishEventForm(event);
  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" sx={{ marginRight: "10px" }} type="submit">
        Publish
      </Button>
    </form>
  );
};

export default React.memo(PublishEvent);
