import React from "react";
import { graphql, useFragment } from "react-relay";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { bookingOptions_BookingFragmentRef$key } from "../../../../artifacts/bookingOptions_BookingFragmentRef.graphql";

export function useBookingOptionsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "Option Name",
        key: "title",
      },
      {
        label: "You Get",
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        key: "attendeePrice",
      },
    ],
    []
  );
}

export function useBookingOptionsColumns(
  bookingFragmentRef: bookingOptions_BookingFragmentRef$key
) {
  const booking = useFragment<bookingOptions_BookingFragmentRef$key>(
    graphql`
      fragment bookingOptions_BookingFragmentRef on Booking {
        status
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
    `,
    bookingFragmentRef
  );
  return React.useMemo(
    () =>
      booking.bookingOptions.map((opt) => ({
        title: opt.eventOption.title,

        organizerPrice: getCurrencyFormat(
          opt.organizerPrice.cents,
          opt.organizerPrice.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          opt.attendeePrice.cents,
          opt.attendeePrice.currency.name
        ),
      })),
    [booking.bookingOptions]
  );
}
