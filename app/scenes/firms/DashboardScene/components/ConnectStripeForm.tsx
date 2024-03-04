import React from "react";
import SubmitButton from "components/shared/SubmitButton";
import { useConnectStripeForm } from "../useConnectStripeForm";

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
