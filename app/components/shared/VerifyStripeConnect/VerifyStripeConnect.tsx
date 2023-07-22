import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import { useVerifyStripeConnectForm } from "./useVerifyStripeConnectForm";
import { VerifyStripeConnect_StripeConnect$key } from "../../../artifacts/VerifyStripeConnect_StripeConnect.graphql";

interface VerifyStripeConnectProps {
  stripeConnectRef: VerifyStripeConnect_StripeConnect$key;
}

const VerifyStripeConnect = ({
  stripeConnectRef,
}: VerifyStripeConnectProps) => {
  const stripeConnect = useFragment<VerifyStripeConnect_StripeConnect$key>(
    graphql`
      fragment VerifyStripeConnect_StripeConnect on StripeConnect {
        ...useVerifyStripeConnectForm_StripeConnect
      }
    `,
    stripeConnectRef
  );
  const form = useVerifyStripeConnectForm(stripeConnect);
  return (
    <form onSubmit={form.handleSubmit()}>
      <IconButton
        color="primary"
        size="sm"
        sx={{ marginRight: "10px" }}
        type="submit"
      >
        <Tooltip title="Verify Stripe Connect">
          <CheckIcon />
        </Tooltip>
      </IconButton>
    </form>
  );
};

export default React.memo(VerifyStripeConnect);
