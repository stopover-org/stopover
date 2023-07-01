import { graphql, usePaginationFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { Grid, TabPanel } from "@mui/joy";
import { SchedulesInformation_EventFragment$key } from "./__generated__/SchedulesInformation_EventFragment.graphql";
import { getHumanDateTime } from "../../../../../lib/utils/dates";
import Table from "../../../../../components/v2/Table";
import Typography from "../../../../../components/v2/Typography";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../../components/shared/tables/columns/schedules";
import { usePagedEdges } from "../../../../../lib/hooks/usePagedEdges";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "../../../../../components/shared/tables/columns/bookings";

interface SchedulesInformationProps {
  eventFragmentRef: SchedulesInformation_EventFragment$key;
  index: number;
}

const SchedulesInformation = ({
  eventFragmentRef,
  index,
}: SchedulesInformationProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious } =
    usePaginationFragment(
      graphql`
        fragment SchedulesInformation_EventFragment on Event
        @refetchable(queryName: "SchedulesSectionEventFragment")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          pagedSchedules: schedules(first: $count, after: $cursor)
            @connection(key: "SchedulesInformation_pagedSchedules") {
            edges {
              node {
                id
                scheduledFor
                bookings {
                  id
                  event {
                    id
                    title
                  }
                  attendeeTotalPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  organizerTotalPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  alreadyPaidPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  attendees {
                    id
                    firstName
                    lastName
                    phone
                    email
                  }
                }
              }
            }
          }
        }
      `,
      eventFragmentRef
    );

  const [selectedSchedule, setSelectedSchedule] = React.useState<null | number>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const schedules = usePagedEdges(data.pagedSchedules, currentPage, 30);
  const schedule = React.useMemo(() => {
    if (!selectedSchedule) return null;
    return schedules[selectedSchedule];
  }, [schedules, selectedSchedule]);
  const schedulesData = useSchedulesColumns(schedules as Record<string, any>[]);
  const schedulesHeaders = useSchedulesHeaders();
  const bookingsData = useBookingsColumns(
    (schedule ? schedule.bookings : []) as any[]
  );
  const bookingsHeaders = useBookingsHeaders();

  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid xs={12} container>
        <Grid xs={4}>
          <Typography level="h4">All Schedules</Typography>
          <Table
            data={schedulesData}
            headers={schedulesHeaders}
            withPagination
            onRowClick={(i: number) => setSelectedSchedule(i)}
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
        <Grid xs={8}>
          {schedule ? (
            <>
              <Typography level="h4">
                Bookings for {getHumanDateTime(moment(schedule.scheduledFor))}
              </Typography>
              <Table
                data={bookingsData}
                headers={bookingsHeaders}
                hoverRow={false}
              />
            </>
          ) : (
            <Typography level="h4">
              Choose schedule to view Bookings for this schedule
            </Typography>
          )}
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default React.memo(SchedulesInformation);
