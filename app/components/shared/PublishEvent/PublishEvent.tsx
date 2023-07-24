import { graphql, useFragment } from "react-relay";
import React from "react";
import { usePublishEventForm } from "./usePublishEventForm";
import { PublishEvent_EventFragment$key } from "../../../artifacts/PublishEvent_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

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
      <SubmitButton
        size="sm"
        sx={{ marginRight: "10px" }}
        submitting={form.formState.isSubmitting}
      >
        Publish
      </SubmitButton>
    </form>
  );
};

export default React.memo(PublishEvent);
