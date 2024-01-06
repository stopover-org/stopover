import { Grid } from "@mui/joy";
import React from "react";
import { Disposable, graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography/Typography";
import Table from "components/v2/Table/Table";
import { SchedulesScene_FirmFragment$key } from "artifacts/SchedulesScene_FirmFragment.graphql";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "components/shared/tables/columns/schedules";
import { SchedulesSceneFirmFragment } from "artifacts/SchedulesSceneFirmFragment.graphql";
import EventsAutocomplete from "components/shared/tables/BookingsFirmTable/components/EventsAutocomplete";
import DateQueryInput from "components/shared/DateQueryInput/DateQueryInput";
import Filters from "components/shared/Filters/Filters";
import { parseValue, useQuery } from "lib/hooks/useQuery";

interface SchedulesSceneProps {
  firmFragmentRef: SchedulesScene_FirmFragment$key;
}

const SchedulesScene = ({ firmFragmentRef }: SchedulesSceneProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious, refetch } =
    usePaginationFragment<
      SchedulesSceneFirmFragment,
      SchedulesScene_FirmFragment$key
    >(
      graphql`
        fragment SchedulesScene_FirmFragment on Firm
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "SchedulesSceneFirmFragment") {
          pagedSchedules: schedules(
            first: $count
            after: $cursor
            filters: $filters
          ) @connection(key: "SchedulesScene_pagedSchedules") {
            ...schedules_useSchedulesColumns_SchedulesConnectionFragment
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const date = useQuery("scheduledFor", null);
  const eventIds = useQuery("eventIds", [], (value) =>
    Array.from(parseValue(value))
  );
  const schedulesData = useSchedulesColumns(data.pagedSchedules);
  const schedulesHeaders = useSchedulesHeaders();
  const { t } = useTranslation();
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          scheduledFor: date,
          eventIds,
        },
        cursor: "0",
      },
      {
        onComplete: () => {
          if (currentPage !== 1) {
            setCurrentPage(1);
          }
        },
      }
    );
  }, [eventIds, date, setCurrentPage]);

  const filters = React.useMemo(
    () => ({
      eventIds: (
        <EventsAutocomplete
          queryKey="eventIds"
          label={t("filters.schedules.eventIds")}
        />
      ),
      scheduledFor: (
        <DateQueryInput
          queryKey="scheduledFor"
          label={t("filters.schedules.scheduledFor")}
        />
      ),
    }),
    []
  );

  return (
    <Grid xs={12} container suppressHydrationWarning>
      <Grid sm={12}>
        <Typography level="h4">{t("models.schedule.plural")}</Typography>
      </Grid>
      <Grid sm={12}>
        <Filters
          availableFilters={filters}
          defaultFilters={["eventIds", "scheduledFor"]}
          scope="schedules"
        />
        <Table
          data={schedulesData}
          headers={schedulesHeaders}
          withPagination
          paginationProps={{
            setPage: setCurrentPage,
            page: currentPage,
            rowsPerPageOptions: [30],
            rowsPerPage: 30,
            colSpan: schedulesHeaders.length,
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

export default React.memo(SchedulesScene);
