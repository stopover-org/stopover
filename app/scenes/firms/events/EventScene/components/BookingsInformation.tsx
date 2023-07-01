import React from "react";
import { Grid, Stack, TabPanel } from "@mui/joy";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import Typography from "../../../../../components/v2/Typography/Typography";
import Table from "../../../../../components/v2/Table";
import useEdges from "../../../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { BookingsSectionEventFragment } from "./__generated__/BookingsSectionEventFragment.graphql";
import { BookingsInformation_EventFragment$key } from "./__generated__/BookingsInformation_EventFragment.graphql";
import { getHumanDateTime } from "../../../../../lib/utils/dates";
import AttendeesCell from "../../../../../components/shared/cells/AttendeesCell";
import BookingOptionsCell from "../../../../../components/shared/cells/BookingOptionsCell";
import Link from "../../../../../components/v2/Link";

interface BookingsInformationProps {
  eventFragmentRef: BookingsInformation_EventFragment$key;
  index: number;
}

const BookingsInformation = ({
  eventFragmentRef,
  index,
}: BookingsInformationProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious } =
    usePaginationFragment<
      BookingsSectionEventFragment,
      BookingsInformation_EventFragment$key
    >(
      graphql`
        fragment BookingsInformation_EventFragment on Event
        @refetchable(queryName: "BookingsSectionEventFragment")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          pagedBookings: bookings(first: $count, after: $cursor)
            @connection(key: "BookingsInformation_pagedBookings") {
            edges {
              node {
                id
                bookedFor
                event {
                  id
                }
                attendeeTotalPrice {
                  cents
                  currency {
                    name
                  }
                }
                organizerTotalPrice {
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
                bookingOptions {
                  eventOption {
                    title
                  }
                  attendeePrice {
                    cents
                    currency {
                      name
                    }
                  }
                  organizerPrice {
                    cents
                    currency {
                      name
                    }
                  }
                }
                attendees {
                  id
                  firstName
                  lastName
                  email
                  phone
                  attendeeOptions {
                    eventOption {
                      title
                    }
                    attendeePrice {
                      cents
                      currency {
                        name
                      }
                    }
                    organizerPrice {
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
        }
      `,
      eventFragmentRef
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
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Typography level="h4">All Bookings</Typography>
          <Table
            hoverRow={false}
            headers={headers}
            data={actualBookings}
            withPagination
            paginationProps={{
              setPage: setCurrentPage,
              page: currentPage,
              rowsPerPageOptions: [30],
              rowsPerPage: 30,
              colSpan: headers.length,
              hasPrevious: currentPage !== 1 || hasPrevious,
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
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default React.memo(BookingsInformation);
