import { graphql, useFragment } from "react-relay";
import React from "react";
import { useSyncStripeForm } from "./useSyncStripeForm";
import { SyncStripe_EventFragment$key } from "../../../artifacts/SyncStripe_EventFragment.graphql";
import SubmitButton from "../SubmitButton";

interface SyncStripeProps {
  eventFragmentRef: SyncStripe_EventFragment$key;
}

const SyncStripe = ({ eventFragmentRef }: SyncStripeProps) => {
  const event = useFragment(
    graphql`
      fragment SyncStripe_EventFragment on Event {
        ...useSyncStripeForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useSyncStripeForm(event);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        color="neutral"
        submitting={form.formState.isSubmitting}
      >
        Sync
      </SubmitButton>
    </form>
  );
};

export default React.memo(SyncStripe);
