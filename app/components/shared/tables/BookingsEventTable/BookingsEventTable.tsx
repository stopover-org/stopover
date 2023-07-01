import { graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "../../../v2/Table/Table";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { useBookingsColumns, useBookingsHeaders } from "../columns/bookings";
import { BookingsEventTableBookingsPaginationQuery } from "./__generated__/BookingsEventTableBookingsPaginationQuery.graphql";
import { BookingsEventTable_BookingsPaginationFragment$key } from "./__generated__/BookingsEventTable_BookingsPaginationFragment.graphql";

interface BookingsEventTableProps {
  eventFragmentRef: BookingsEventTable_BookingsPaginationFragment$key;
  withPagination?: boolean;
}

const BookingsEventTable = ({
  eventFragmentRef,
  withPagination,
}: BookingsEventTableProps) => {
  const {
    data: { paginatedBookings },
    hasPrevious,
    hasNext,
    loadPrevious,
    loadNext,
  } = usePaginationFragment<
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
    eventFragmentRef
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedBookings = usePagedEdges(paginatedBookings, currentPage, 30);
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

export default React.memo(BookingsEventTable);
