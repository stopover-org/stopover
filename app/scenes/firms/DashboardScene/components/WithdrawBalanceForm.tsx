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
  const balance = useFragment<WithdrawBalanceForm_BalanceFragment$key>(
    graphql`
      fragment WithdrawBalanceForm_BalanceFragment on Balance {
        totalAmount {
          cents
        }
        firm {
          stripeConnects {
            status
          }
        }
        ...useWithdrawBalanceForm_BalanceFragment
      }
    `,
    balanceFragmentRef
  );
  const form = useWithdrawBalanceForm(balance);
  const activeStripeConnect = React.useMemo(
    () =>
      balance.firm.stripeConnects
        .map((stripeConnect) => stripeConnect.status)
        .find((status) => status === "active"),
    [balance]
  );

  if (balance.totalAmount.cents <= 0 || !activeStripeConnect) return null;

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton size="lg" submitting={form.formState.isSubmitting}>
        Withdraw
      </SubmitButton>
    </form>
  );
};
export default React.memo(WithdrawBalanceForm);
