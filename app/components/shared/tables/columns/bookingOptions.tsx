import React from "react";
import { graphql, useFragment } from "react-relay";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { bookingOptions_BookingFragmentRef$key } from "../../../../artifacts/bookingOptions_BookingFragmentRef.graphql";
import ChangeBookingOptionAvailability from "../../ChangeBookingOptionAvailabilityModal";
import OptionTagColor from "../../OptionTagColor/OptionTagColor";
import Checkbox from "../../../v2/Checkbox";
import { ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key } from "../../../../artifacts/ChangeBookingOptionAvailabilityModal_BookingOptionFragment.graphql";

export function useBookingOptionsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "Option Name",
        width: 100,
        key: "title",
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
        label: "Built In",
        width: 100,
        key: "builtIn",
      },
      { label: "Status", width: 100, key: "status" },
      { label: "", width: 100, key: "actions" },
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
          status
          eventOption {
            title
            builtIn
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
          ...ChangeBookingOptionAvailabilityModal_BookingOptionFragment
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
          opt.eventOption.builtIn ? 0 : opt.organizerPrice.cents,
          opt.organizerPrice.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          opt.eventOption.builtIn ? 0 : opt.attendeePrice.cents,
          opt.attendeePrice.currency.name
        ),
        builtIn: (
          <Checkbox label="" checked={opt.eventOption.builtIn} readOnly />
        ),
        status: <OptionTagColor status={opt.status} />,
        actions:
          booking.status !== "cancelled" ? (
            <ChangeBookingOptionAvailability
              optionFragmentRef={
                opt as ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key
              }
            />
          ) : null,
      })),
    [booking.bookingOptions]
  );
}
