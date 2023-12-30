import { Grid } from "@mui/joy";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Section from "../../../../components/v2/Section";
import Typography from "../../../../components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "../../../../artifacts/PaymentsSection_FirmFragment.graphql";
import Table from "../../../../components/v2/Table/Table";
import useEdges from "../../../../lib/hooks/useEdges";
import Link from "../../../../components/v2/Link";
import { PaymentSectionFirmFragment } from "../../../../artifacts/PaymentSectionFirmFragment.graphql";
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

  const payments = useEdges(data.payments) as ReadonlyArray<
    Record<string, any>
  >;

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
  const { t } = useTranslation();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">{t("models.payment.plural")}</Typography>
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
          {t("general.all")} {t("models.payment.plural")}
        </Link>
      </Grid>
    </Section>
  );
};

export default React.memo(PaymentsSection);
