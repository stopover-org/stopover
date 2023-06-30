import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import Table from "../../../../components/v2/Table";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { dateTimeFormat, getHumanDateTime } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import { BookingsSceneFirmPaginationQuery } from "./__generated__/BookingsSceneFirmPaginationQuery.graphql";
import { BookingsScene_BookingsFirmPaginationFragment$key } from "./__generated__/BookingsScene_BookingsFirmPaginationFragment.graphql";
import useEdges from "../../../../lib/hooks/useEdges";
import AttendeesCell from "../../../../components/shared/cells/AttendeesCell";
import BookingOptionsCell from "../../../../components/shared/cells/BookingOptionsCell";

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
          pagedBookings: bookings(first: $count, after: $cursor)
            @connection(key: "BookingsScene_query_pagedBookings") {
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
  const bookings = useEdges(data.pagedBookings);
  const actualBookings = React.useMemo(
    () =>
      bookings.map((booking) => ({
        id: (
          <Link primary href={`/my-firm/bookings/${booking.id}`}>
            {booking.id}
          </Link>
        ),
        bookedFor: getHumanDateTime(moment(booking.bookedFor)),
        organizerPrice: getCurrencyFormat(
          booking?.organizerTotalPrice?.cents,
          booking?.organizerTotalPrice?.currency?.name
        ),
        attendeePrice: getCurrencyFormat(
          booking?.attendeeTotalPrice?.cents,
          booking?.attendeeTotalPrice?.currency?.name
        ),
        alreadyPaid: getCurrencyFormat(
          booking?.alreadyPaidPrice?.cents,
          booking?.alreadyPaidPrice?.currency?.name
        ),
        attendees: (
          <AttendeesCell
            attendeesCount={booking.attendees.length}
            data={booking.attendees.map(
              ({ firstName, lastName, phone, email }, index) => ({
                id: index + 1,
                firstName: firstName || "N/A",
                lastName: lastName || "N/A",
                phone: phone || "N/A",
                email: email || "N/A",
              })
            )}
          />
        ),
        bookingOptions: (
          <BookingOptionsCell
            bookingOptionsCount={booking.bookingOptions.length}
            data={booking.bookingOptions.map(
              (
                { eventOption: { title }, organizerPrice, attendeePrice },
                i
              ) => ({
                id: i + 1,
                title: title || "N/A",
                organizerPrice:
                  getCurrencyFormat(
                    organizerPrice?.cents,
                    organizerPrice?.currency?.name
                  ) || "N/A",
                attendeePrice:
                  getCurrencyFormat(
                    attendeePrice?.cents,
                    attendeePrice?.currency?.name
                  ) || "N/A",
              })
            )}
          />
        ),
      })),
    [bookings]
  );

  const headers = React.useMemo(
    () => [
      {
        label: "ID",
        width: 150,
        key: "id",
      },
      {
        label: "Booked For",
        width: 150,
        key: "bookedFor",
      },
      {
        label: "You Get",
        width: 100,
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        width: 100,
        key: "attendeePrice",
      },
      {
        label: "Already Paid",
        width: 100,
        key: "alreadyPaid",
      },
      {
        label: "Booking Options",
        width: 300,
        key: "bookingOptions",
      },
      {
        label: "Attendees",
        width: 300,
        key: "attendees",
      },
    ],
    []
  );

  return (
    <Table
      headers={headers}
      data={actualBookings}
      hoverRow={false}
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
