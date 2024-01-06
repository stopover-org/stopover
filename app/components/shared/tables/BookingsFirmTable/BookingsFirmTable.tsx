import { Disposable, graphql, usePaginationFragment } from "react-relay";
import React from "react";
import Table from "components/v2/Table/Table";
import { BookingsFirmTable_BookingsFirmPaginationFragment$key } from "artifacts/BookingsFirmTable_BookingsFirmPaginationFragment.graphql";
import { BookingsFirmTableFirmPaginationQuery } from "artifacts/BookingsFirmTableFirmPaginationQuery.graphql";
import { parseValue, useQuery } from "lib/hooks/useQuery";
import Filters from "components/shared/Filters";
import { useTranslation } from "react-i18next";
import { useBookingsColumns, useBookingsHeaders } from "../columns/bookings";
import ContactEmailInput from "./components/ContactEmailInput";
import ContactPhoneInput from "./components/ContactPhoneInput";
import EventsAutocomplete from "./components/EventsAutocomplete";
import DateQueryInput from "../../DateQueryInput";

interface BookingFirmTableProps {
  firmFragmentRef: BookingsFirmTable_BookingsFirmPaginationFragment$key;
  withPagination?: boolean;
}

const BookingsFirmTable = ({
  firmFragmentRef,
  withPagination,
}: BookingFirmTableProps) => {
  const { t } = useTranslation();
  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
    usePaginationFragment<
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
          bookings(first: $count, after: $cursor, filters: $bookingsFilter)
            @connection(key: "BookingsFirmTable_query_bookings") {
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
      firmFragmentRef
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
        bookingsFilter: {
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

  const bookings = useBookingsColumns(data.bookings);
  const headers = useBookingsHeaders();
  const filters = React.useMemo(
    () => ({
      contactEmail: <ContactEmailInput />,
      contactPhone: <ContactPhoneInput />,
      eventIds: (
        <EventsAutocomplete
          key="eventIds"
          label={t("filters.bookings.eventIds")}
        />
      ),
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
      <Filters availableFilters={filters} defaultFilters={["eventIds"]} />
      <Table
        data={bookings}
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

export default React.memo(BookingsFirmTable);
