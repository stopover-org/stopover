import { Disposable, graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "components/v2/Table/Table";
import { BookingsEventTableBookingsPaginationQuery } from "artifacts/BookingsEventTableBookingsPaginationQuery.graphql";
import { BookingsEventTable_BookingsPaginationFragment$key } from "artifacts/BookingsEventTable_BookingsPaginationFragment.graphql";
import { useTranslation } from "react-i18next";
import { useBookingsColumns, useBookingsHeaders } from "../columns/bookings";
import Filters from "../../Filters/Filters";
import ContactEmailInput from "../BookingsFirmTable/components/ContactEmailInput";
import ContactPhoneInput from "../BookingsFirmTable/components/ContactPhoneInput";
import DateQueryInput from "../../DateQueryInput/DateQueryInput";
import { parseValue, useQuery } from "../../../../lib/hooks/useQuery";

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
  const actualBookings = useBookingsColumns(data.paginatedBookings);
  const headers = useBookingsHeaders();
  const { t } = useTranslation();
  const filters = React.useMemo(
    () => ({
      contactEmail: <ContactEmailInput />,
      contactPhone: <ContactPhoneInput />,
      bookedFor: (
        <DateQueryInput
          key="bookedFor"
          label={t("filters.bookings.bookedFor")}
        />
      ),
    }),
    []
  );

  return (
    <>
      <Filters availableFilters={filters} defaultFilters={["bookedFor"]} />
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
