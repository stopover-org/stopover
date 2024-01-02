import { graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "components/v2/Table/Table";
import { BookingsEventTableBookingsPaginationQuery } from "artifacts/BookingsEventTableBookingsPaginationQuery.graphql";
import { BookingsEventTable_BookingsPaginationFragment$key } from "artifacts/BookingsEventTable_BookingsPaginationFragment.graphql";
import { useBookingsColumns, useBookingsHeaders } from "../columns/bookings";

interface BookingsEventTableProps {
  eventFragmentRef: BookingsEventTable_BookingsPaginationFragment$key;
  withPagination?: boolean;
}

const BookingsEventTable = ({
  eventFragmentRef,
  withPagination,
}: BookingsEventTableProps) => {
  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment<
      BookingsEventTableBookingsPaginationQuery,
      BookingsEventTable_BookingsPaginationFragment$key
    >(
      graphql`
        fragment BookingsEventTable_BookingsPaginationFragment on Event
        @refetchable(queryName: "BookingsEventTableBookingsPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          paginatedBookings: bookings(first: $count, after: $cursor)
            @connection(key: "BookingsEventTable_query_paginatedBookings") {
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
      eventFragmentRef
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const actualBookings = useBookingsColumns(data.paginatedBookings);
  const headers = useBookingsHeaders();

  return (
    <Table
      data={actualBookings}
      headers={headers}
      aria-label="bookings table"
      hoverRow={false}
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

export default React.memo(BookingsEventTable);
