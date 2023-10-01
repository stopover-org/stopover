import { Grid } from "@mui/joy";
import moment from "moment/moment";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table/Table";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { SchedulesScene_FirmFragment$key } from "../../../../artifacts/SchedulesScene_FirmFragment.graphql";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "../../../../components/shared/tables/columns/bookings";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../components/shared/tables/columns/schedules";
import useEdges from "../../../../lib/hooks/useEdges";
import { SchedulesSceneFirmFragment } from "../../../../artifacts/SchedulesSceneFirmFragment.graphql";

interface SchedulesSceneProps {
  firmFragmentRef: SchedulesScene_FirmFragment$key;
}

const SchedulesScene = ({ firmFragmentRef }: SchedulesSceneProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious } =
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
          pagedSchedules: schedules(first: $count, after: $cursor)
            @connection(key: "SchedulesScene_pagedSchedules") {
            edges {
              node {
                id
                scheduledFor
                status
                event {
                  title
                  id
                }
                bookings {
                  id
                  status
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
                  bookingOptions {
                    id
                    eventOption {
                      title
                      builtIn
                    }
                    status
                    organizerPrice {
                      cents
                      currency {
                        name
                      }
                    }
                    attendeePrice {
                      cents
                      currency {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      firmFragmentRef
    );

  const [selectedSchedule, setSelectedSchedule] = React.useState<null | number>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const schedules = useEdges(data.pagedSchedules);
  const schedule = React.useMemo(
    () => schedules[selectedSchedule!],
    [schedules, selectedSchedule]
  );
  const schedulesData = useSchedulesColumns(schedules);
  const schedulesHeaders = useSchedulesHeaders();
  const bookingsData = useBookingsColumns(
    (schedule ? schedule.bookings : []) as any[]
  );
  const bookingsHeaders = useBookingsHeaders();

  return (
    <Grid xs={12} container>
      <Grid md={4} sm={12}>
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
      <Grid md={8} sm={12}>
        {schedule ? (
          <>
            <Typography level="h4">
              Bookings for {schedule.event.title} on {getHumanDateTime(moment(schedule.scheduledFor))}
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
  );
};

export default React.memo(SchedulesScene);
