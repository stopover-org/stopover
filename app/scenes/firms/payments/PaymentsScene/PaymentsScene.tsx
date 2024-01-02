import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { PaymentsScene_FirmFragment$key } from "artifacts/PaymentsScene_FirmFragment.graphql";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "components/shared/tables/columns/payments";
import { PaymentsSceneFirmFragment } from "artifacts/PaymentsSceneFirmFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import Table from "components/v2/Table/Table";
import { Grid } from "@mui/joy";

interface PaymentsSceneProps {
  firmFragmentRef: PaymentsScene_FirmFragment$key;
}

const PaymentsScene = ({ firmFragmentRef }: PaymentsSceneProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious, refetch } =
    usePaginationFragment<
      PaymentsSceneFirmFragment,
      PaymentsScene_FirmFragment$key
    >(
      graphql`
        fragment PaymentsScene_FirmFragment on Firm
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "PaymentsSceneFirmFragment") {
          payments(first: $count, after: $cursor)
            @connection(key: "PaymentsScene_payments") {
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
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const payments = usePaymentsColumns(data.payments);
  const headers = usePaymentsHeaders();

  return (
    <Grid xs={12} container suppressHydrationWarning>
      <Grid sm={12}>
        <Typography level="h4">{t("models.payment.plural")}</Typography>
      </Grid>
      <Grid sm={12}>
        <Table
          data={payments}
          headers={headers}
          withPagination
          paginationProps={{
            setPage: setCurrentPage,
            page: currentPage,
            rowsPerPageOptions: [30],
            rowsPerPage: 30,
            colSpan: headers.length,
            hasPrevious,
            hasNext,
            onNextPage: () => {
              if (hasNext) {
                loadNext(30, {
                  onComplete: () => setCurrentPage(currentPage + 1),
                });
              }
            },
            onPrevPage: () => {
              if (hasPrevious) {
                loadPrevious(30, {
                  onComplete: () => setCurrentPage(currentPage - 1),
                });
              }
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(PaymentsScene);
