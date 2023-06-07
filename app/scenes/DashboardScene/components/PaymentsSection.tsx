import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "./__generated__/PaymentsSection_FirmFragment.graphql";

interface PaymentSectionProps {
  firmFragmentRef: PaymentsSection_FirmFragment$key;
}

const PaymentsSection = ({ firmFragmentRef }: PaymentSectionProps) => {
  const payment = useFragment(
    graphql`
      fragment PaymentsSection_FirmFragment on Firm
      @refetchable(queryName: "PaymentSectionFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        payments(first: $count, after: $cursor)
          @connection(key: "DashboardScene_query_payments") {
          edges {
            node {
              id
              status
              totalPrice {
                cents
                currency {
                  name
                  symbol
                }
              }
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  return (
    <Section>
      <Stack>
        <Grid>payments</Grid>
        <Typography>100$</Typography>
        <Typography>100$</Typography>
        <Typography>100$</Typography>
        <Typography>100$</Typography>
        <Typography>100$</Typography>
      </Stack>
    </Section>
  );
};

export default React.memo(PaymentsSection);
