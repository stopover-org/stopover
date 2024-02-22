import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import Typography from "components/v2/Typography/Typography";
import Table from "components/v2/Table/Table";
import { Grid, Stack } from "@mui/joy";
import {
  useAccountsColumns,
  useAccountsHeaders,
} from "components/shared/tables/columns/accounts";
import { UsersSceneFirmFragment } from "artifacts/UsersSceneFirmFragment.graphql";
import { UsersScene_FirmFragment$key } from "artifacts/UsersScene_FirmFragment.graphql";
import InviteUser from "components/shared/InviteUser";

interface PaymentsSceneProps {
  firmFragmentRef: UsersScene_FirmFragment$key;
}

const UsersScene = ({ firmFragmentRef }: PaymentsSceneProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious } =
    usePaginationFragment<UsersSceneFirmFragment, UsersScene_FirmFragment$key>(
      graphql`
        fragment UsersScene_FirmFragment on Firm
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "UsersSceneFirmFragment") {
          accounts(first: $count, after: $cursor)
            @connection(key: "UsersScene_accounts") {
            ...accounts_useAccountsColumns_AccountsConnectionFragment
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
  const payments = useAccountsColumns(data.accounts!);
  const headers = useAccountsHeaders();

  return (
    <Grid xs={12} container suppressHydrationWarning>
      <Grid sm={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography level="h4">{t("models.payment.plural")}</Typography>

          <InviteUser />
        </Stack>
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

export default React.memo(UsersScene);
