import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { useUnpublishEventForm } from "./useUnpublishEventForm";
import { UnpublishEvent_EventFragment$key } from "./__generated__/UnpublishEvent_EventFragment.graphql";

interface PublishEventProps {
  eventFragmentRef: UnpublishEvent_EventFragment$key;
}

const UnpublishEvent = ({ eventFragmentRef }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment UnpublishEvent_EventFragment on Event {
        ...useUnpublishEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useUnpublishEventForm(event);
  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" sx={{ marginRight: "10px" }} type="submit">
        Unpublish
      </Button>
    </form>
  );
};

export default React.memo(UnpublishEvent);
