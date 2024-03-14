import { Disposable, graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "components/v2/Table/Table";
import { BookingsEventTableBookingsPaginationQuery } from "artifacts/BookingsEventTableBookingsPaginationQuery.graphql";
import { BookingsEventTable_BookingsPaginationFragment$key } from "artifacts/BookingsEventTable_BookingsPaginationFragment.graphql";
import { useTranslation } from "react-i18next";
import { useQuery } from "lib/hooks/useQuery";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "components/shared/tables/columns/bookings";
import DateQueryInput from "components/shared/DateQueryInput";
import Filters from "../../Filters";
import ContactEmailInput from "../BookingsFirmTable/components/ContactEmailInput";
import ContactPhoneInput from "../BookingsFirmTable/components/ContactPhoneInput";

interface BookingsEventTableProps {
  eventFragmentRef: BookingsEventTable_BookingsPaginationFragment$key;
  withPagination?: boolean;
}

const BookingsEventTable = ({
  eventFragmentRef,
  withPagination,
}: BookingsEventTableProps) => {
  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
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
          filters: { type: "BookingsFilter", defaultValue: {} }
        ) {
          paginatedBookings: bookings(
            first: $count
            after: $cursor
            filters: $filters
          ) @connection(key: "BookingsEventTable_query_paginatedBookings") {
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
  const queryRef = React.useRef<Disposable>();
  const contactEmail = useQuery("contactEmail", "");
  const contactPhone = useQuery("contactPhone", "");
  const date = useQuery("bookedFor", null);

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          contactEmail,
          contactPhone,
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
  }, [contactEmail, contactPhone, date, setCurrentPage]);
  const actualBookings = useBookingsColumns(data.paginatedBookings!);
  const headers = useBookingsHeaders();
  const { t } = useTranslation();
  const filters = React.useMemo(
    () => ({
      contactEmail: <ContactEmailInput />,
      contactPhone: <ContactPhoneInput />,
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
    <>
      <React.Suspense>
        <Filters
          availableFilters={filters}
          defaultFilters={["bookedFor"]}
          scope="bookings"
        />
      </React.Suspense>
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
    </>
  );
};

export default React.memo(BookingsEventTable);
