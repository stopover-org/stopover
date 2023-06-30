import { graphql, usePaginationFragment } from "react-relay";
import React, { useMemo } from "react";
import moment from "moment";
import { Grid, TabPanel } from "@mui/joy";
import { SchedulesInformation_EventFragment$key } from "./__generated__/SchedulesInformation_EventFragment.graphql";
import { getHumanDateTime } from "../../../../../lib/utils/dates";
import Table from "../../../../../components/v2/Table";
import useEdges from "../../../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import Link from "../../../../../components/v2/Link";
import AttendeesCell from "../../../../../components/shared/cells/AttendeesCell";

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
  const schedules = useEdges(data.pagedSchedules);
  const schedule = React.useMemo(() => {
    if (!selectedSchedule) return null;
    return schedules[selectedSchedule];
  }, [schedules, selectedSchedule]);

  const schedulesData = useMemo<Record<string, any>[]>(
    () =>
      schedules.map((scheduleRow) => ({
        date: getHumanDateTime(moment(scheduleRow.scheduledFor)),
        bookings: scheduleRow.bookings?.length,
        attendees: scheduleRow.bookings.reduce((acc, booking) => {
          acc += booking.attendees.length;
          return acc;
        }, 0),
      })),
    [schedules]
  );

  const schedulesHeaders = useMemo(
    () => [
      {
        label: "Date",
        width: 150,
        key: "date",
      },
      {
        label: "Bookings",
        width: 50,
        key: "bookings",
      },
      {
        label: "Attendees",
        width: 50,
        key: "attendees",
      },
    ],
    []
  );

  const bookingsData = React.useMemo(() => {
    if (!schedule) return [] as Record<string, any>[];
    return schedule.bookings.map((booking) => ({
      id: (
        <Link primary href={`/my-firm/bookings/${booking.id}`}>
          {booking.id}
        </Link>
      ),
      attendeesCount: booking.attendees.length,
      organizerPrice: getCurrencyFormat(
        booking?.organizerTotalPrice?.cents,
        booking?.organizerTotalPrice?.currency?.name
      ),
      attendeePrice: getCurrencyFormat(
        booking?.attendeeTotalPrice?.cents,
        booking?.attendeeTotalPrice?.currency?.name
      ),
      alreadyPaid: getCurrencyFormat(
        booking?.alreadyPaidPrice?.cents,
        booking?.alreadyPaidPrice?.currency?.name
      ),
      attendees: (
        <AttendeesCell
          data={booking.attendees.map(
            ({ firstName, lastName, phone, email }, index) => ({
              id: index + 1,
              firstName: firstName || "N/A",
              lastName: lastName || "N/A",
              phone: phone || "N/A",
              email: email || "N/A",
            })
          )}
        />
      ),
    }));
  }, [schedule]);

  const bookingsHeaders = React.useMemo(
    () => [
      {
        key: "id",
        width: 150,
        label: "ID",
      },
      {
        key: "attendeesCount",
        width: 100,
        label: "Attendees",
      },
      {
        key: "organizerPrice",
        width: 100,
        label: "You get(total)",
      },
      {
        key: "attendeePrice",
        width: 100,
        label: "Attendee to pay(total)",
      },
      {
        key: "alreadyPaid",
        width: 100,
        label: "Attendee paid (already)",
      },
      {
        key: "attendees",
        width: 300,
        label: "Attendees",
      },
    ],
    [schedule]
  );

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
