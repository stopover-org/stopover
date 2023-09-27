import React, { useMemo } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import Table from "../../../v2/Table/Table";
import Link from "../../../v2/Link/Link";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Tag from "../../../v2/Tag/Tag";
import { dateTimeFormat } from "../../../../lib/utils/dates";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Checkbox from "../../../v2/Checkbox";
import { EventsTableFirmFragment } from "../../../../artifacts/EventsTableFirmFragment.graphql";
import { EventsTable_FirmFragment$key } from "../../../../artifacts/EventsTable_FirmFragment.graphql";

interface EventsTableProps {
  firmFragmentRef: any;
  withPagination?: boolean;
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    status,
  });

  return (
    <Tag level="body-md" link={false} color={color}>
      {status}
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
      ) {
        events(first: $count, after: $cursor)
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedEvents = usePagedEdges(events, currentPage, 30);
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
        recurringDaysWithTime: event.recurringDaysWithTime.map((date) => (
          <Tag
            level="body-md"
            link={false}
            sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
          >
            {date}
          </Tag>
        )),
        singleDaysWithTime: event.singleDaysWithTime.map((date) => (
          <>
            <Tag
              level="body-md"
              link={false}
              sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
            >
              {moment(date).format(dateTimeFormat)}
            </Tag>{" "}
          </>
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
      { key: "title", width: 300, label: "Title" },
      { key: "organizerPrice", width: 100, label: "You get" },
      { key: "attendeePrice", width: 100, label: "Attendee pay" },
      { key: "recurringDaysWithTime", width: 300, label: "Recurring Dates" },
      { key: "singleDaysWithTime", width: 300, label: "Specific dates" },
      { key: "durationTime", width: 100, label: "Duration Time" },
      { key: "status", width: 100, label: "Status" },
      { key: "endDate", width: 100, label: "End Date" },
      { key: "minAttendees", width: 100, label: "Minimal Attendees" },
      { key: "maxAttendees", width: 100, label: "Maximum Attendees" },
      { key: "requiresCheckIn", width: 100, label: "Require Check In" },
    ],
    []
  );
  return (
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
  );
};

export default React.memo(EventsTable);
