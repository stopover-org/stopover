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
              }
            }
          }
        }
      `,
      firmFragmentRef
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const events = usePagedEdges(data.events, currentPage, 30).map((row) => ({
    ...row,
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
          {moment(removeUtc(date)).format(dateTimeFormat)}
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
  }));

  const headers = React.useMemo(
    () => [
      {
        key: "title",
        width: 300,
        label: "Title",
      },
      {
        key: "eventType",
        width: 100,
        label: "Event Type",
      },
      {
        key: "recurringType",
        width: 100,
        label: "Recurring Type",
      },
      { key: "recurringDaysWithTime", width: 300, label: "Recurring Dates" },
      { key: "singleDaysWithTime", width: 300, label: "Single Dates" },
      { key: "durationTime", width: 100, label: "Duration" },
      { key: "status", width: 100, label: "Status" },
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
