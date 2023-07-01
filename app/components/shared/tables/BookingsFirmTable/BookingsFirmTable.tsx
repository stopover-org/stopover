import { graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "../../../v2/Table/Table";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { BookingsFirmTableFirmPaginationQuery } from "./__generated__/BookingsFirmTableFirmPaginationQuery.graphql";
import { BookingsFirmTable_BookingsFirmPaginationFragment$key } from "./__generated__/BookingsFirmTable_BookingsFirmPaginationFragment.graphql";
import { useBookingsColumns, useBookingsHeaders } from "../columns/bookings";

interface BookingFirmTableProps {
  firmFragmentRef: BookingsFirmTable_BookingsFirmPaginationFragment$key;
  withPagination?: boolean;
}

const BookingsFirmTable = ({
  firmFragmentRef,
  withPagination,
}: BookingFirmTableProps) => {
  const {
    data: { bookings },
    hasPrevious,
    hasNext,
    loadPrevious,
    loadNext,
  } = usePaginationFragment<
    BookingsFirmTableFirmPaginationQuery,
    BookingsFirmTable_BookingsFirmPaginationFragment$key
  >(
    graphql`
      fragment BookingsFirmTable_BookingsFirmPaginationFragment on Firm
      @refetchable(queryName: "BookingsFirmTableFirmPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        bookings(first: $count, after: $cursor)
          @connection(key: "BookingsFirmTable_query_bookings") {
          edges {
            node {
              id
              status
              bookedFor
              organizerTotalPrice {
                cents
                currency {
                  name
                }
              }
              attendeeTotalPrice {
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
                firstName
                lastName
                phone
                email
              }
              bookingOptions {
                eventOption {
                  title
                }
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
    `,
    firmFragmentRef
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedBookings = usePagedEdges(bookings, currentPage, 30);
  const actualBookings = useBookingsColumns(pagedBookings);
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

export default React.memo(BookingsFirmTable);
