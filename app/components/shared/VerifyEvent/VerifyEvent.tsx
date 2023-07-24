import React from "react";
import { graphql, useFragment } from "react-relay";
import { useVerifyEvent } from "./useVerifyEvent";
import { VerifyEventInformation_EventFragment$key } from "../../../artifacts/VerifyEventInformation_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

interface VerifyEventProps {
  eventFragmentRef: VerifyEventInformation_EventFragment$key;
}

const VerifyEvent = ({ eventFragmentRef }: VerifyEventProps) => {
  const event = useFragment(
    graphql`
      fragment VerifyEventInformation_EventFragment on Event {
        ...useVerifyEvent_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useVerifyEvent(event);

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        submitting={form.formState.isSubmitting}
        color="neutral"
      >
        Verify
      </SubmitButton>
    </form>
  );
};

export default React.memo(VerifyEvent);
