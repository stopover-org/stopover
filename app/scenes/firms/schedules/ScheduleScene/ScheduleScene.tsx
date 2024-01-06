import {
  Disposable,
  graphql,
  useFragment,
  usePaginationFragment,
} from "react-relay";
import { Card, CardContent, Grid } from "@mui/joy";
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
import CopyToClipboard from "components/shared/CopyToClipboard/CopyToClipboard";
import Filters from "components/shared/Filters/Filters";
import ContactEmailInput from "components/shared/tables/BookingsFirmTable/components/ContactEmailInput";
import ContactPhoneInput from "components/shared/tables/BookingsFirmTable/components/ContactPhoneInput";
import EventsAutocomplete from "components/shared/tables/BookingsFirmTable/components/EventsAutocomplete";
import DateQueryInput from "components/shared/DateQueryInput/DateQueryInput";
import { parseValue, useQuery } from "lib/hooks/useQuery";

interface ScheduleSceneProps {
  scheduleFragmentRef: ScheduleScene_FirmScheduleFragment$key;
}

const ScheduleScene = ({ scheduleFragmentRef }: ScheduleSceneProps) => {
  const schedule = useFragment<ScheduleScene_FirmScheduleFragment$key>(
    graphql`
      fragment ScheduleScene_FirmScheduleFragment on Schedule {
        id
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

  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
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
          filters: { type: "BookingsFilter", defaultValue: {} }
        ) {
          bookings(first: $count, after: $cursor, filters: $filters)
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
  const queryRef = React.useRef<Disposable>();
  const contactEmail = useQuery("contactEmail", "");
  const contactPhone = useQuery("contactPhone", "");
  const date = useQuery("bookedFor", null);
  const eventIds = useQuery("eventIds", [], (value) =>
    Array.from(parseValue(value))
  );

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          contactEmail,
          contactPhone,
          eventIds,
          bookedFor: date,
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
  }, [contactEmail, contactPhone, eventIds, date, setCurrentPage]);

  const filters = React.useMemo(
    () => ({
      contactEmail: <ContactEmailInput />,
      contactPhone: <ContactPhoneInput />,
      eventIds: (
        <EventsAutocomplete
          queryKey="eventIds"
          label={t("filters.bookings.eventIds")}
        />
      ),
      bookedFor: (
        <DateQueryInput
          queryKey="bookedFor"
          label={t("filters.bookings.bookedFor")}
        />
      ),
    }),
    []
  );

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
          primary
        >
          {schedule.event.title}
        </Link>
      </Grid>

      <Grid lg={6} md={8} sm={12} xs={12}>
        <Card sx={{ margin: "0 auto" }}>
          <Typography level="title-lg">
            {t("models.schedule.singular")}
          </Typography>
          <CardContent>
            <Grid container>
              <Grid xs={4}>{t("models.schedule.attributes.id")}</Grid>
              <Grid xs={8}>
                <CopyToClipboard text={schedule.id} />
              </Grid>
              <Grid xs={4}>{t("models.event.singular")}</Grid>
              <Grid xs={8}>
                <Link href={`/my-firm/events/${schedule.event.id}`} primary>
                  {schedule.event.title}
                </Link>
              </Grid>
              <Grid xs={4}>{t("models.schedule.attributes.status")}</Grid>
              <Grid xs={8}>{t(`statuses.${schedule.status}`)}</Grid>
              <Grid xs={4}>{t("models.schedule.attributes.scheduledFor")}</Grid>
              <Grid xs={8}>
                {moment(schedule.scheduledFor).format(dateTimeFormat)}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid xs={12}>
        <Filters
          availableFilters={filters}
          defaultFilters={["eventIds"]}
          scope="bookings"
        />
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
