import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button/Button";
import { useSyncStripeForm } from "./useSyncStripeForm";
import { SyncStripe_EventFragment$key } from "./__generated__/SyncStripe_EventFragment.graphql";

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
      <Button
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
        color="neutral"
      >
        Sync
      </Button>
    </form>
  );
};

export default React.memo(SyncStripe);
