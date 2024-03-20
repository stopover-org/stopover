import moment from "moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useBookingStates_ReasonBookingFragment$key } from "artifacts/useBookingStates_ReasonBookingFragment.graphql";
import { useBookingStates_BookingFragment$key } from "artifacts/useBookingStates_BookingFragment.graphql";
import { useBookingStates_CancellableBookingFragment$key } from "artifacts/useBookingStates_CancellableBookingFragment.graphql";
import { useBookingStates_PayableBookingFragment$key } from "artifacts/useBookingStates_PayableBookingFragment.graphql";

export function useBookingDisabled(
  bookingFragmentRef: useBookingStates_BookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useBookingStates_BookingFragment on Booking {
        status
        bookedFor
        alreadyPaidPrice {
          cents
        }
      }
    `,
    bookingFragmentRef
  );
  return React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()) ||
      booking.alreadyPaidPrice.cents > 0,
    [booking]
  );
}

export function useBookingDisabledReason(
  bookingFragmentRef: useBookingStates_ReasonBookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useBookingStates_ReasonBookingFragment on Booking {
        status
        bookedFor
        alreadyPaidPrice {
          cents
        }
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();

  return React.useMemo(() => {
    if (booking.status === "cancelled") {
      return t("models.booking.reasons.inactive");
    }
    if (moment(booking.bookedFor).isBefore(new Date())) {
      return t("models.booking.reasons.past");
    }
    if (booking.alreadyPaidPrice.cents > 0) {
      return t("models.booking.reasons.paid");
    }
    return null;
  }, [booking]);
}

export function useBookingCancellable(
  bookingFragmentRef: useBookingStates_CancellableBookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useBookingStates_CancellableBookingFragment on Booking {
        status
        bookedFor
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(
    () =>
      booking.status !== "cancelled" &&
      moment(booking.bookedFor).isAfter(new Date()),
    [booking.status, booking.bookedFor]
  );
}

export function useBookingPayable(
  bookingFragmentRef: useBookingStates_PayableBookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useBookingStates_PayableBookingFragment on Booking {
        status
        bookedFor
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(
    () =>
      booking.status === "active" &&
      !moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );
}
