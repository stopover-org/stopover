import { Grid, Stack } from "@mui/joy";
import React, { useMemo } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment/moment";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "./__generated__/PaymentsSection_FirmFragment.graphql";
import Table from "../../../components/v2/Table/Table";
import useEdges from "../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import { getHumanDateTime } from "../../../lib/utils/dates";

interface PaymentSectionProps {
  firmFragmentRef: PaymentsSection_FirmFragment$key;
}

const PaymentsSection = ({ firmFragmentRef }: PaymentSectionProps) => {
  const { data } = usePaginationFragment(
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
              updatedAt
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
  const payments = useEdges(data.payments);
  const actualPayments = useMemo(
    () =>
      payments.map((payment) => ({
        price: getCurrencyFormat(
          payment?.totalPrice?.cents,
          payment?.totalPrice?.currency.name
        ),
        date: getHumanDateTime(moment(payment.updatedAt)),
      })),
    [payments]
  );

  return (
    <Section>
      <Stack>
        <Grid>
          <Typography level="h3">Payments</Typography>
        </Grid>

        <Table
          data={actualPayments}
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
