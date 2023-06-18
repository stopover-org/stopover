import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import Table from "../../../../components/v2/Table";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag";
import { EventsScene_EventsFirmPaginationFragment$key } from "./__generated__/EventsScene_EventsFirmPaginationFragment.graphql";
import { EventsSceneFirmPaginationQuery } from "./__generated__/EventsSceneFirmPaginationQuery.graphql";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { dateTimeFormat, removeUtc } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";

interface EventsSceneProps {
  firmFragmentRef: EventsScene_EventsFirmPaginationFragment$key;
}

const EventsScene = ({ firmFragmentRef }: EventsSceneProps) => {
  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment<
      EventsSceneFirmPaginationQuery,
      EventsScene_EventsFirmPaginationFragment$key
    >(
      graphql`
        fragment EventsScene_EventsFirmPaginationFragment on Firm
        @refetchable(queryName: "EventsSceneFirmPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          events(first: $count, after: $cursor)
            @connection(key: "EventsScene_query_events") {
            edges {
              node {
                id
                title
                eventType
                recurringType
                recurringDaysWithTime
                singleDaysWithTime
                durationTime
                status
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
              }
            }
          }
        }
      `,
      firmFragmentRef
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedData = usePagedEdges(data.events, currentPage, 30);
  const events = React.useMemo(
    () =>
      pagedData.map((row) => ({
        ...row,
        organizerPricePerUom: getCurrencyFormat(
          row?.organizerPricePerUom?.cents,
          row?.organizerPricePerUom?.currency.name
        ),
        attendeePricePerUom: getCurrencyFormat(
          row?.attendeePricePerUom?.cents,
          row?.attendeePricePerUom?.currency.name
        ),
        title: (
          <Link level="body1" href={`/my-firm/events/${row.id}`}>
            {row.title}
          </Link>
        ),
        recurringDaysWithTime: row.recurringDaysWithTime.map((date) => (
          <Tag
            level="body3"
            link={false}
            sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
          >
            {date}
          </Tag>
        )),
        singleDaysWithTime: row.singleDaysWithTime.map((date) => (
          <>
            <Tag
              level="body3"
              link={false}
              sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
            >
              {moment(date).format(dateTimeFormat)}
            </Tag>{" "}
          </>
        )),
        status: (
          <Tag
            level="body3"
            link={false}
            color={row.status === "deleted" ? "danger" : "primary"}
          >
            {row.status}
          </Tag>
        ),
      })),
    [pagedData]
  );

  const headers = React.useMemo(
    () => [
      {
        key: "title",
        label: "Title",
      },
      {
        key: "eventType",
        label: "Event Type",
      },
      {
        key: "recurringType",
        label: "Recurring Type",
      },
      {
        key: "organizerPricePerUom",
        label: "You get",
      },
      {
        key: "attendeePricePerUom",
        label: "Attendee pay",
      },
      {
        key: "recurringDaysWithTime",
        label: "Recurring Dates",
      },
      { key: "singleDaysWithTime", label: "Single Dates" },
      { key: "durationTime", label: "Duration" },
      { key: "status", label: "Status" },
    ],
    []
  );

  return (
    <Table
      headers={headers}
      data={events}
      withPagination
      paginationProps={{
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

export default React.memo(EventsScene);
