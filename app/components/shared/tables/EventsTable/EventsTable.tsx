import React, { useMemo } from "react";
import { graphql, usePaginationFragment, Disposable } from "react-relay";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/joy";
import Table from "../../../v2/Table/Table";
import Link from "../../../v2/Link/Link";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Tag from "../../../v2/Tag/Tag";
import { dateTimeFormat } from "../../../../lib/utils/dates";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Checkbox from "../../../v2/Checkbox";
import { EventsTableFirmFragment } from "../../../../artifacts/EventsTableFirmFragment.graphql";
import { EventsTable_FirmFragment$key } from "../../../../artifacts/EventsTable_FirmFragment.graphql";
import useEdges from "../../../../lib/hooks/useEdges";
import Input from "../../../v2/Input";

interface EventsTableProps {
  firmFragmentRef: any;
  withPagination?: boolean;
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

const EventsTable = ({ firmFragmentRef, withPagination }: EventsTableProps) => {
  const {
    data: { events },
    hasPrevious,
    hasNext,
    loadPrevious,
    loadNext,
    refetch,
  } = usePaginationFragment<
    EventsTableFirmFragment,
    EventsTable_FirmFragment$key
  >(
    graphql`
      fragment EventsTable_FirmFragment on Firm
      @refetchable(queryName: "EventsTableFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        cursor: { type: "String", defaultValue: "" }
        filters: { type: "EventsFilter", defaultValue: {} }
      ) {
        events(first: $count, after: $cursor, filters: $filters)
          @connection(key: "EventsTable_query_events") {
          edges {
            node {
              id
              title
              fullAddress
              status
              durationTime
              endDate
              minAttendees
              maxAttendees
              organizerPricePerUom {
                cents
                currency {
                  name
                }
              }
              attendeePricePerUom {
                cents
                currency {
                  name
                }
              }
              singleDaysWithTime
              recurringDaysWithTime
              requiresCheckIn
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [value, setValue] = React.useState("");
  const pagedEvents = useEdges(events);
  const data = useMemo(
    () =>
      pagedEvents.map((event) => ({
        title: (
          <Link primary href={`/my-firm/events/${event.id}`}>
            {event.title}
          </Link>
        ),
        organizerPrice: getCurrencyFormat(
          event.organizerPricePerUom?.cents,
          event.organizerPricePerUom?.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          event.attendeePricePerUom?.cents,
          event.attendeePricePerUom?.currency.name
        ),
        recurringDaysWithTime: event.recurringDaysWithTime.map(
          (date, index) => (
            <Tag
              key={`${index}-${date}`}
              link={false}
              sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
            >
              {date}
            </Tag>
          )
        ),
        singleDaysWithTime: event.singleDaysWithTime.map((date, index) => (
          <React.Fragment key={`${index}-${date}`}>
            <Tag
              key={`${index}-${date}`}
              link={false}
              sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
            >
              {moment(date).format(dateTimeFormat)}
            </Tag>{" "}
          </React.Fragment>
        )),
        status: <TagColor status={event.status} />,
        durationTime: event.durationTime,
        minAttendees: event.minAttendees,
        maxAttendees: event.maxAttendees,
        requiresCheckIn: (
          <Checkbox checked={!!event.requiresCheckIn} readOnly label="" />
        ),
      })),
    [pagedEvents]
  );

  const headers = React.useMemo(
    () => [
      { key: "title", width: 300, label: t("models.event.attributes.title") },
      {
        key: "organizerPrice",
        width: 100,
        label: t("models.event.attributes.organizerPricePerUom"),
      },
      {
        key: "attendeePrice",
        width: 100,
        label: t("models.event.attributes.attendeePricePerUom"),
      },
      {
        key: "recurringDaysWithTime",
        width: 300,
        label: t("models.event.attributes.recurringDaysWithTime"),
      },
      {
        key: "singleDaysWithTime",
        width: 300,
        label: t("models.event.attributes.singleDaysWithTime"),
      },
      {
        key: "durationTime",
        width: 100,
        label: t("models.event.attributes.durationTime"),
      },
      { key: "status", width: 100, label: t("models.event.attributes.status") },
      {
        key: "endDate",
        width: 100,
        label: t("models.event.attributes.endDate"),
      },
      {
        key: "minAttendees",
        width: 100,
        label: t("models.event.attributes.minAttendees"),
      },
      {
        key: "maxAttendees",
        width: 100,
        label: t("models.event.attributes.maxAttendees"),
      },
      {
        key: "requiresCheckIn",
        width: 100,
        label: t("models.event.attributes.requiresCheckIn"),
      },
    ],
    []
  );
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          query: value,
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
  }, [value, currentPage, setCurrentPage]);

  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <Input
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          label="Search event"
          size="sm"
        />
      </Grid>
      <Grid xs={12}>
        <Table
          data={data}
          headers={headers}
          aria-label="events table"
          withPagination={withPagination}
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

export default React.memo(EventsTable);
