import React from "react";
import Button from "../../../../components/v2/Button";
import { useConnectStripeForm } from "../useConnectStripeForm";
import SubmitButton from "../../../../components/shared/SubmitButton";

const ConnectStripeForm = () => {
  const form = useConnectStripeForm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
        Connect Stripe
      </SubmitButton>
    </form>
  );
};
export default React.memo(ConnectStripeForm);
