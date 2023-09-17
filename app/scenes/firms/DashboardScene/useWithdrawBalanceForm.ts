import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useWithdrawBalanceForm_WithdrawBalanceMutation } from "../../../artifacts/useWithdrawBalanceForm_WithdrawBalanceMutation.graphql";
import { useWithdrawBalanceForm_BalanceFragment$key } from "../../../artifacts/useWithdrawBalanceForm_BalanceFragment.graphql";

interface WithdrawBalanceFields {}

function useDefaultValues(): WithdrawBalanceFields {
  return React.useMemo(() => ({}), []);
}

const validationSchema = Yup.object().shape({});

export function useWithdrawBalanceForm(
  balanceFragmentRef: useWithdrawBalanceForm_BalanceFragment$key
) {
  const balance = useFragment(
    graphql`
      fragment useWithdrawBalanceForm_BalanceFragment on Balance {
        totalAmount {
          cents
        }
      }
    `,
    balanceFragmentRef
  );
  return useMutationForm<
    WithdrawBalanceFields,
    useWithdrawBalanceForm_WithdrawBalanceMutation
  >(
    graphql`
      mutation useWithdrawBalanceForm_WithdrawBalanceMutation(
        $input: WithdrawBalanceInput!
      ) {
        withdrawBalance(input: $input) {
          payout {
            status
            totalAmount {
              cents
            }
          }
          notification
          errors
        }
      }
    `,
    () => ({ input: { amountCents: balance.totalAmount.cents } }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
    }
  );
}
