import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { ScheduleScene_FirmScheduleFragment$key } from "artifacts/ScheduleScene_FirmScheduleFragment.graphql";
import { ScheduleScene_BookingsPaginationFragment$key } from "artifacts/ScheduleScene_BookingsPaginationFragment.graphql";
import { ScheduleTableBookingsPaginationQuery } from "artifacts/ScheduleTableBookingsPaginationQuery.graphql";
import Typography from "components/v2/Typography/Typography";
import Link from "components/v2/Link/Link";
import Tag from "components/v2/Tag/Tag";
import useStatusColor from "lib/hooks/useStatusColor";
import { dateTimeFormat } from "lib/utils/dates";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "components/shared/tables/columns/bookings";
import Table from "components/v2/Table/Table";

interface ScheduleSceneProps {
  scheduleFragmentRef: ScheduleScene_FirmScheduleFragment$key;
}

const ScheduleScene = ({ scheduleFragmentRef }: ScheduleSceneProps) => {
  const schedule = useFragment<ScheduleScene_FirmScheduleFragment$key>(
    graphql`
      fragment ScheduleScene_FirmScheduleFragment on Schedule {
        scheduledFor
        status
        event {
          id
          title
          firm {
            title
          }
        }
        ...ScheduleScene_BookingsPaginationFragment
      }
    `,
    scheduleFragmentRef
  );

  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment<
      ScheduleTableBookingsPaginationQuery,
      ScheduleScene_BookingsPaginationFragment$key
    >(
      graphql`
        fragment ScheduleScene_BookingsPaginationFragment on Schedule
        @refetchable(queryName: "ScheduleTableBookingsPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          bookings(first: $count, after: $cursor)
            @connection(key: "ScheduleBookingsTable_query_bookings") {
            ...bookings_useBookingsColumns_BookingsConnectionFragment
            edges {
              node {
                __typename
                id
              }
            }
          }
        }
      `,
      schedule
    );

  const tagColor = useStatusColor({
    primary: ["active"],
    danger: ["disabled"],
    status: schedule.status,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const actualBookings = useBookingsColumns(data.bookings);
  const headers = useBookingsHeaders();
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sm={12} md={12}>
      <Grid lg={8} sm={12}>
        <Typography level="h4">{schedule.event.firm.title}</Typography>
        <Typography level="h3">
          {moment(schedule.scheduledFor).format(dateTimeFormat)}
          <Tag color={tagColor} link={false}>
            {t(`statuses.${schedule.status}`)}
          </Tag>
        </Typography>
        <Link
          href={`/my-firm/events/${schedule.event.id}`}
          underline={false}
          level="h4"
          primary
        >
          {schedule.event.title}
        </Link>
      </Grid>
      <Grid xs={12}>
        <Table
          data={actualBookings}
          headers={headers}
          aria-label="bookings table"
          hoverRow={false}
          withPagination
          paginationProps={{
            rowsPerPage: 30,
            colSpan: headers.length,
            setPage: setCurrentPage,
            page: currentPage,
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

export default React.memo(ScheduleScene);
