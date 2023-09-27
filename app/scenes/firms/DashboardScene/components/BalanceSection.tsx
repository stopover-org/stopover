import { Chip, Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../../components/v2/Section";
import { BalanceSection_FirmFragment$key } from "../../../../artifacts/BalanceSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { capitalize } from "../../../../lib/utils/capitalize";
import ConnectStripeForm from "./ConnectStripeForm";
import StripeConnectsTable from "../../../../components/shared/tables/StripeConnectsTable";
import WithdrawBalanceForm from "./WithdrawBalanceForm";

interface BalanceSectionProps {
  firmFragmentRef: BalanceSection_FirmFragment$key;
  currentUserFragmentRef: any;
}
const BalanceSection = ({
  firmFragmentRef,
  currentUserFragmentRef,
}: BalanceSectionProps) => {
  const firm = useFragment<BalanceSection_FirmFragment$key>(
    graphql`
      fragment BalanceSection_FirmFragment on Firm {
        paymentTypes
        balance {
          totalAmount {
            cents
            currency {
              name
            }
          }
          processingPayments {
            cents
            currency {
              name
            }
          }
          ...WithdrawBalanceForm_BalanceFragment
        }
        stripeConnects {
          status
        }
        ...StripeConnectsTable_FirmFragment
      }
    `,
    firmFragmentRef
  );

  const currentUser = useFragment(
    graphql`
      fragment BalanceSection_CurrentUserFragment on User {
        ...StripeConnectsTable_CurrentUserFragment
      }
    `,
    currentUserFragmentRef
  );

  const activeStripeConnect = firm.stripeConnects.find(
    ({ status }) => status === "active" || status === "pending"
  );
  return (
    <Section>
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography level="h3">Balance</Typography>
        </Grid>
        <Grid xs={3}>
          <Typography level="h4">Total:</Typography>
        </Grid>
        <Grid xs={4}>
          <Typography level="h4">
            {getCurrencyFormat(
              firm.balance?.totalAmount?.cents,
              firm.balance?.totalAmount?.currency?.name
            )}
          </Typography>
          <Typography level="body-md">
            Processing:&nbsp;
            {getCurrencyFormat(
              firm.balance?.processingPayments?.cents,
              firm.balance?.processingPayments?.currency?.name
            )}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <WithdrawBalanceForm balanceFragmentRef={firm.balance!} />
        </Grid>

        <Grid xs={12}>
          <Typography level="h4">Available Payments</Typography>
        </Grid>
        <Grid xs={12}>
          {firm.paymentTypes.map((type) => (
            <Chip key={type} sx={{ marginRight: "5px" }}>{capitalize(type)}</Chip>
          ))}
        </Grid>

        <Grid xs={12}>
          <Typography level="h4">Payout Settings</Typography>
        </Grid>
        {firm.paymentTypes.includes("stripe") && !activeStripeConnect && (
          <Grid xs={12}>
            <ConnectStripeForm />
          </Grid>
        )}

        <Grid xs={12}>
          <Typography level="h4">Connected Stripe Accounts</Typography>
        </Grid>
        <Grid xs={12}>
          <StripeConnectsTable
            firmFragmentRef={firm}
            currentUserFragmentRef={currentUser}
          />
        </Grid>
      </Grid>
    </Section>
  );
};
export default React.memo(BalanceSection);
