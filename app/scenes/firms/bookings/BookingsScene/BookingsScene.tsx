import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import Table from "../../../../components/v2/Table";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { dateTimeFormat } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import { BookingsSceneFirmPaginationQuery } from "./__generated__/BookingsSceneFirmPaginationQuery.graphql";
import { BookingsScene_BookingsFirmPaginationFragment$key } from "./__generated__/BookingsScene_BookingsFirmPaginationFragment.graphql";

interface EventsSceneProps {
  firmFragmentRef: any;
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: "deleted",
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

const EventsScene = ({ firmFragmentRef }: EventsSceneProps) => {
  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment<
      BookingsSceneFirmPaginationQuery,
      BookingsScene_BookingsFirmPaginationFragment$key
    >(
      graphql`
        fragment BookingsScene_BookingsFirmPaginationFragment on Firm
        @refetchable(queryName: "BookingsSceneFirmPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          bookings(first: $count, after: $cursor)
            @connection(key: "BookingsScene_query_bookings") {
            edges {
              node {
                id
                status
              }
            }
          }
        }
      `,
      firmFragmentRef
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedData = usePagedEdges(data.bookings, currentPage, 30);
  const events = React.useMemo(() => pagedData.map((row) => ({})), [pagedData]);
  const headers = React.useMemo(() => [], []);

  return (
    <Table
      headers={headers}
      data={events}
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
  );
};

export default React.memo(EventsScene);
