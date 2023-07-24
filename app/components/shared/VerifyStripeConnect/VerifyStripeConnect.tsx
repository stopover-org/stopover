import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import { useVerifyStripeConnectForm } from "./useVerifyStripeConnectForm";
import { VerifyStripeConnect_StripeConnect$key } from "../../../artifacts/VerifyStripeConnect_StripeConnect.graphql";
import SubmitButton from "../SubmitButton";

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
      <SubmitButton submitting={form.formState.isSubmitting} icon size="sm">
        <Tooltip title="Verify Stripe Connect">
          <CheckIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(VerifyStripeConnect);
