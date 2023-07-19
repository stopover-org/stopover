import { Chip, Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../../components/v2/Section";
import { BalanceSection_FirmFragment$key } from "../../../../artifacts/BalanceSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Fieldset from "../../../../components/v2/Fieldset/Fieldset";
import { capitalize } from "../../../../lib/utils/capitalize";
import Button from "../../../../components/v2/Button";
import ConnectStripeForm from "./ConnectStripeForm";

interface BalanceSectionProps {
  firmFragmentRef: BalanceSection_FirmFragment$key;
}
const BalanceSection = ({ firmFragmentRef }: BalanceSectionProps) => {
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
        }
      }
    `,
    firmFragmentRef
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
        <Grid xs={9}>
          <Typography level="h4">
            {getCurrencyFormat(
              firm.balance?.totalAmount?.cents,
              firm.balance?.totalAmount?.currency?.name
            )}
          </Typography>
        </Grid>

        <Grid xs={12}>
          <Typography level="h4">Available Payments</Typography>
        </Grid>
        <Grid xs={12}>
          {firm.paymentTypes.map((type) => (
            <Chip sx={{ marginRight: "5px" }}>{capitalize(type)}</Chip>
          ))}
        </Grid>

        <Grid xs={12}>
          <Typography level="h4">Payout Settings</Typography>
        </Grid>
        <Grid xs={12}>
          <ConnectStripeForm />
        </Grid>
      </Grid>
    </Section>
  );
};
export default React.memo(BalanceSection);
