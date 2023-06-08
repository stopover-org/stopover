import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import { BalanceSection_FirmFragment$key } from "./__generated__/BalanceSection_FirmFragment.graphql";
import Typography from "../../../components/v2/Typography";

interface BalanceSectionProps {
  firmFragmentRef: BalanceSection_FirmFragment$key;
}
const BalanceSection = ({ firmFragmentRef }: BalanceSectionProps) => {
  const balance = useFragment(
    graphql`
      fragment BalanceSection_FirmFragment on Firm {
        balance {
          totalAmount {
            cents
            currency {
              name
              symbol
              fullName
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
        <Grid xs={12}>Grapdafdsfdsfdfasdsddddhdddddddddf</Grid>
        <Grid xs={3}>
          <Typography>Total:</Typography>
        </Grid>
        <Grid xs={9}>
          <Typography>
            {balance.balance?.totalAmount?.cents}{" "}
            {balance.balance?.totalAmount?.currency?.symbol}
          </Typography>
        </Grid>
      </Grid>
    </Section>
  );
};
export default React.memo(BalanceSection);
