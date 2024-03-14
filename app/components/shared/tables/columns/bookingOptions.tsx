import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { bookingOptions_BookingFragmentRef$key } from "artifacts/bookingOptions_BookingFragmentRef.graphql";
import OptionTagColor from "components/shared/OptionTagColor/OptionTagColor";
import Checkbox from "components/v2/Checkbox";
import { ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key } from "artifacts/ChangeBookingOptionAvailabilityModal_BookingOptionFragment.graphql";
import ChangeBookingOptionAvailability from "components/shared/ChangeBookingOptionAvailabilityModal";

export function useBookingOptionsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        label: t("models.eventOption.attributes.title"),
        width: 200,
        key: "title",
      },
      {
        label: t("models.bookingOption.attributes.organizerPrice"),
        width: 100,
        key: "organizerPrice",
      },
      {
        label: t("models.bookingOption.attributes.attendeePrice"),
        width: 100,
        key: "attendeePrice",
      },
      {
        label: t("models.bookingOption.attributes.builtIn"),
        width: 100,
        key: "builtIn",
      },
      {
        label: t("models.bookingOption.attributes.status"),
        width: 175,
        key: "status",
      },
      { label: t("general.actions"), width: 100, key: "actions" },
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
