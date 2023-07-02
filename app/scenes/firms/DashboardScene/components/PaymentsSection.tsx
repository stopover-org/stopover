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
import { PaymentSectionFirmFragment } from "./__generated__/PaymentSectionFirmFragment.graphql";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "../../../../components/shared/tables/columns/payments";

interface PaymentSectionProps {
  firmFragmentRef: PaymentsSection_FirmFragment$key;
}

const PaymentsSection = ({ firmFragmentRef }: PaymentSectionProps) => {
  const { data } = usePaginationFragment<
    PaymentSectionFirmFragment,
    PaymentsSection_FirmFragment$key
  >(
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
              createdAt
              booking {
                event {
                  id
                  title
                }
                id
              }
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
  const actualPayments = usePaymentsColumns(
    payments.map((payment) => ({
      event: {
        id: payment.booking.event.id,
        title: payment.booking.event.title,
      },
      booking: {
        id: payment.booking.id,
      },
      createdAt: payment.createdAt,
      totalPrice: payment.totalPrice,
      status: payment.status,
    }))
  );
  const headers = usePaymentsHeaders();

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
