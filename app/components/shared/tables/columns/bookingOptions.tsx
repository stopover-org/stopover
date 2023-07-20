import React from "react";
import { graphql, useFragment } from "react-relay";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { bookingOptions_BookingFragmentRef$key } from "../../../../artifacts/bookingOptions_BookingFragmentRef.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import ChangeBookingOptionAvailability from "../../ChangeBookingOptionAvailability";
import { ChangeBookingOptionAvailability_BookingOptionFragment$key } from "../../../../artifacts/ChangeBookingOptionAvailability_BookingOptionFragment.graphql";

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
      { label: "Status", width: 100, key: "status" },
      { label: "", width: 100, key: "actions" },
    ],
    []
  );
}

const OptionTagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: "not_available",
    primary: "available",
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

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
          ...ChangeBookingOptionAvailability_BookingOptionFragment
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
        status: <OptionTagColor status={opt.status} />,
        actions:
          booking.status === "active" ? (
            <ChangeBookingOptionAvailability
              optionFragmentRef={
                opt as ChangeBookingOptionAvailability_BookingOptionFragment$key
              }
            />
          ) : null,
      })),
    [booking.bookingOptions]
  );
}
