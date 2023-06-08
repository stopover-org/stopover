import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "./__generated__/PaymentsSection_FirmFragment.graphql";
import Table from "../../../components/v2/Table/Table";

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
        <Grid>
          <Typography level="h3">Payments</Typography>
        </Grid>

        <Table
          data={[
            {
              price: <Typography>100$</Typography>,
              date: <Typography>02.03.23</Typography>,
            },
            {
              price: <Typography>200$</Typography>,
              date: <Typography>02.03.23</Typography>,
            },
            {
              price: <Typography>300$</Typography>,
              date: <Typography>04.03.23</Typography>,
            },
          ]}
          headers={[
            {
              label: <Typography>price</Typography>,
              key: "price",
            },
            {
              label: <Typography>date</Typography>,
              key: "date",
            },
          ]}
          aria-label="basic table"
        />
      </Stack>
    </Section>
  );
};

export default React.memo(PaymentsSection);
