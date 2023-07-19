import React from "react";
import Button from "../../../../components/v2/Button";
import { useConnectStripeForm } from "../useConnectStripeForm";

const ConnectStripeForm = () => {
  const form = useConnectStripeForm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" type="submit">
        Connect Stripe
      </Button>
    </form>
  );
};
export default React.memo(ConnectStripeForm);
