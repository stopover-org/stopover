import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { useRemoveEventForm } from "./useRemoveEventForm";
import { RemoveEvent_EventFragment$key } from "./__generated__/RemoveEvent_EventFragment.graphql";

interface PublishEventProps {
  eventFragmentRef: RemoveEvent_EventFragment$key;
}

const RemoveEvent = ({ eventFragmentRef }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment RemoveEvent_EventFragment on Event {
        ...useRemoveEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useRemoveEventForm(event);
  return (
    <form onSubmit={form.handleSubmit()}>
      <Button
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
        color="danger"
      >
        Remove
      </Button>
    </form>
  );
};

export default React.memo(RemoveEvent);
