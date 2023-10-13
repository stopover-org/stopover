import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  if (balance.totalAmount.cents <= 0 || !activeStripeConnect) return null;

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
        {t("scenes.firms.dashboardScene.withdraw")}
      </SubmitButton>
    </form>
  );
};
export default React.memo(WithdrawBalanceForm);
