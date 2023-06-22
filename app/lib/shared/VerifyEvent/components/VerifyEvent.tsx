import React from "react";
import { graphql, useFragment } from "react-relay";
import Button from "../../../../components/v2/Button/Button";
import { useVerifyEvent } from "../useVerifyEvent";
import { VerifyEventInformation_EventFragment$key } from "./__generated__/VerifyEventInformation_EventFragment.graphql";

interface VerifyEventProps {
  currentEventFragmentRef: VerifyEventInformation_EventFragment$key;
}

const VerifyEvent = ({ currentEventFragmentRef }: VerifyEventProps) => {
  const event = useFragment(
    graphql`
      fragment VerifyEventInformation_EventFragment on Event {
        ...useVerifyEvent_EventFragment
      }
    `,
    currentEventFragmentRef
  );
  const form = useVerifyEvent(event);

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" type="submit" color="neutral">
        Verify
      </Button>
    </form>
  );
};

export default React.memo(VerifyEvent);
