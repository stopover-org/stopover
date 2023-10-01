import { graphql, useFragment } from "react-relay";
import React from "react";
import { useRemoveEventForm } from "./useRemoveEventForm";
import { RemoveEvent_EventFragment$key } from "../../../artifacts/RemoveEvent_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

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
      <SubmitButton
        size="sm"
        submitting={form.formState.isSubmitting}
        color="danger"
      >
        Remove
      </SubmitButton>
    </form>
  );
};

export default React.memo(RemoveEvent);
