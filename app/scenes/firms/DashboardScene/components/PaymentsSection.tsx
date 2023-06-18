import { Grid, Stack } from "@mui/joy";
import React, { useMemo } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment/moment";
import Section from "../../../../components/v2/Section";
import Typography from "../../../../components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "./__generated__/PaymentsSection_FirmFragment.graphql";
import Table from "../../../../components/v2/Table/Table";
import useEdges from "../../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import Link from "../../../../components/v2/Link";

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
        price: (
          <Link href={`/my-firm/payments/${payment.id}`}>
            {getCurrencyFormat(
              payment?.totalPrice?.cents,
              payment?.totalPrice?.currency.name
            )}
          </Link>
        ),
        date: getHumanDateTime(moment(payment.updatedAt)),
      })),
    [payments]
  );

  const headers = useMemo(
    () => [
      {
        label: "You get",
        key: "price",
      },
      {
        label: "Date",
        key: "date",
      },
    ],
    []
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Payments</Typography>
      </Grid>

      <Grid xs={12}>
        <Table
          data={actualPayments}
          headers={headers}
          aria-label="payments table"
        />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/payments" fontSize="sm">
          All Payments
        </Link>
      </Grid>
    </Section>
  );
};

export default React.memo(PaymentsSection);
