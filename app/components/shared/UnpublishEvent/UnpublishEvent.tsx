import { graphql, useFragment } from "react-relay";
import React from "react";
import { useUnpublishEventForm } from "./useUnpublishEventForm";
import { UnpublishEvent_EventFragment$key } from "../../../artifacts/UnpublishEvent_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

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
      <SubmitButton
        size="sm"
        sx={{ marginRight: "10px" }}
        submitting={form.formState.isSubmitting}
      >
        Unpublish
      </SubmitButton>
    </form>
  );
};

export default React.memo(UnpublishEvent);
