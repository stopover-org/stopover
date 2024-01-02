import { Disposable, graphql, usePaginationFragment } from "react-relay";
import React from "react";
import { Grid, TabPanel } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { SchedulesInformation_EventFragment$key } from "artifacts/SchedulesInformation_EventFragment.graphql";
import Table from "components/v2/Table";
import Typography from "components/v2/Typography";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "components/shared/tables/columns/schedules";
import { SchedulesSectionEventFragment } from "artifacts/SchedulesSectionEventFragment.graphql";
import { Moment } from "moment";
import DateRangePicker from "../../../../../components/v2/DateRangePicker/DateRangePicker";

interface SchedulesInformationProps {
  eventFragmentRef: SchedulesInformation_EventFragment$key;
  index: number;
}

const SchedulesInformation = ({
  eventFragmentRef,
  index,
}: SchedulesInformationProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious, refetch } =
    usePaginationFragment<
      SchedulesSectionEventFragment,
      SchedulesInformation_EventFragment$key
    >(
      graphql`
        fragment SchedulesInformation_EventFragment on Event
        @refetchable(queryName: "SchedulesSectionEventFragment")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
          filters: { type: "SchedulesFilter", defaultValue: {} }
        ) {
          pagedSchedules: schedules(
            first: $count
            after: $cursor
            filters: $filters
          ) @connection(key: "SchedulesInformation_pagedSchedules") {
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
      eventFragmentRef
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
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid xs={12} container>
        <Grid md={12} lg={12} sm={12}>
          <Typography level="h4">
            {t("general.all")} {t("models.schedule.plural")}
          </Typography>
          <Grid md={6} sm={12} container>
            <DateRangePicker
              value={range}
              onChange={(dates) => setRange(dates)}
              clearStyles={{ paddingTop: "30px" }}
              startInputProps={{
                label: t(
                  "scenes.attendees.events.eventsScene.sidebar.startDate"
                ),
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
              hasPrevious: currentPage !== 1 || hasPrevious,
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
    </TabPanel>
  );
};

export default React.memo(SchedulesInformation);
