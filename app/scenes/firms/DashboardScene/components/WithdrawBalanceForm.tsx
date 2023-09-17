import React from "react";
import { graphql, useFragment } from "react-relay";
import SubmitButton from "../../../../components/shared/SubmitButton";
import { useWithdrawBalanceForm } from "../useWithdrawBalanceForm";
import { WithdrawBalanceForm_BalanceFragment$key } from "../../../../artifacts/WithdrawBalanceForm_BalanceFragment.graphql";

const WithdrawBalanceForm = ({
  balanceFragmentRef,
}: {
  balanceFragmentRef: WithdrawBalanceForm_BalanceFragment$key;
}) => {
  const balance = useFragment(
    graphql`
      fragment WithdrawBalanceForm_BalanceFragment on Balance {
        ...useWithdrawBalanceForm_BalanceFragment
      }
    `,
    balanceFragmentRef
  );
  const form = useWithdrawBalanceForm(balance);

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton size="lg" submitting={form.formState.isSubmitting}>
        Withdraw
      </SubmitButton>
    </form>
  );
};
export default React.memo(WithdrawBalanceForm);
