import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeclineStripeConnectForm } from "./useDeclineStripeConnectForm";
import { DeclineStripeConnect_StripeConnect$key } from "../../../artifacts/DeclineStripeConnect_StripeConnect.graphql";

interface DeclineStripeConnectProps {
  stripeConnectRef: DeclineStripeConnect_StripeConnect$key;
  force?: boolean;
}

const DeclineStripeConnect = ({
  stripeConnectRef,
  force = false,
}: DeclineStripeConnectProps) => {
  const stripeConnect = useFragment<DeclineStripeConnect_StripeConnect$key>(
    graphql`
      fragment DeclineStripeConnect_StripeConnect on StripeConnect {
        ...useDeclineStripeConnectForm_StripeConnect
      }
    `,
    stripeConnectRef
  );
  const form = useDeclineStripeConnectForm(stripeConnect, force);
  return (
    <form onSubmit={form.handleSubmit()}>
      <IconButton
        color="danger"
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
      >
        <Tooltip title={`${force ? "Remove" : "Decline"} Stripe Connect`}>
          {force ? <DeleteIcon /> : <CloseIcon />}
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(DeclineStripeConnect);
