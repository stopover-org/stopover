import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { VerifyStripeConnect_StripeConnect$key } from "artifacts/VerifyStripeConnect_StripeConnect.graphql";
import SubmitButton from "components/shared/SubmitButton";
import { useVerifyStripeConnectForm } from "./useVerifyStripeConnectForm";

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
  const { t } = useTranslation();
  const form = useVerifyStripeConnectForm(stripeConnect);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton submitting={form.formState.isSubmitting} icon size="sm">
        <Tooltip title={t("forms.verifyStripeConnect.tooltip")}>
          <CheckIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(VerifyStripeConnect);
