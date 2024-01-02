import { Grid } from "@mui/joy";
import React from "react";
import { Disposable, graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { Moment } from "moment";
import Typography from "components/v2/Typography/Typography";
import Table from "components/v2/Table/Table";
import { SchedulesScene_FirmFragment$key } from "artifacts/SchedulesScene_FirmFragment.graphql";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "components/shared/tables/columns/schedules";
import { SchedulesSceneFirmFragment } from "artifacts/SchedulesSceneFirmFragment.graphql";
import DateRangePicker from "components/v2/DateRangePicker/DateRangePicker";

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
          filters: { type: "SchedulesFilter", defaultValue: {} }
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
  const schedulesData = useSchedulesColumns(data.pagedSchedules);
  const schedulesHeaders = useSchedulesHeaders();
  const { t } = useTranslation();
  const [range, setRange] = React.useState<[Moment | null, Moment | null]>([
    null,
    null,
  ]);
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          startDate: range[0]?.toISOString(),
          endDate: range[1]?.toISOString(),
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
  }, [range, setCurrentPage]);

  return (
    <Grid xs={12} container suppressHydrationWarning>
      <Grid sm={12}>
        <Typography level="h4">{t("models.schedule.plural")}</Typography>
        <Grid md={6} sm={12} container>
          <DateRangePicker
            value={range}
            onChange={(dates) => setRange(dates)}
            clearStyles={{ paddingTop: "30px" }}
            startInputProps={{
              label: t("scenes.attendees.events.eventsScene.sidebar.startDate"),
              placeholder: t(
                "scenes.attendees.events.eventsScene.sidebar.startDatePlaceholder"
              ),
              size: "sm",
            }}
            endInputProps={{
              label: t("scenes.attendees.events.eventsScene.sidebar.endDate"),
              placeholder: t(
                "scenes.attendees.events.eventsScene.sidebar.endDatePlaceholder"
              ),
              size: "sm",
            }}
          />
        </Grid>
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
