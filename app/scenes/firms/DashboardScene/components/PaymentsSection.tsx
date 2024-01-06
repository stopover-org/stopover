import { Grid } from "@mui/joy";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Section from "components/v2/Section";
import Typography from "components/v2/Typography/Typography";
import { PaymentsSection_FirmFragment$key } from "artifacts/PaymentsSection_FirmFragment.graphql";
import Table from "components/v2/Table/Table";
import Link from "components/v2/Link";
import { PaymentSectionFirmFragment } from "artifacts/PaymentSectionFirmFragment.graphql";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "components/shared/tables/columns/payments";

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
          ...payments_usePaymentsColumns_PaymentsConnectionFragment
          edges {
            node {
              __typename
              id
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  const actualPayments = usePaymentsColumns(data.payments);
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
