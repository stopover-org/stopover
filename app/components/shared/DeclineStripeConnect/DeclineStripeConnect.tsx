import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useDeclineStripeConnectForm } from "./useDeclineStripeConnectForm";
import { DeclineStripeConnect_StripeConnect$key } from "../../../artifacts/DeclineStripeConnect_StripeConnect.graphql";
import SubmitButton from "../SubmitButton";

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
  const { t } = useTranslation();
  const form = useDeclineStripeConnectForm(stripeConnect, force);
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        icon
        size="sm"
        color="danger"
      >
        <Tooltip
          title={
            force
              ? t("forms.removeStripeConnect.tooltip")
              : t("forms.declineStripeConnect.tooltip")
          }
        >
          {force ? <DeleteIcon /> : <CloseIcon />}
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(DeclineStripeConnect);
