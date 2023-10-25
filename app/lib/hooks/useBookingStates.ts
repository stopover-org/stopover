import moment from "moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useBookingStates_ReasonBookingFragment$key } from "../../artifacts/useBookingStates_ReasonBookingFragment.graphql";
import { useBookingStates_BookingFragment$key } from "../../artifacts/useBookingStates_BookingFragment.graphql";
import { useBookingStates_CancellableBookingFragment$key } from "../../artifacts/useBookingStates_CancellableBookingFragment.graphql";

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

  return React.useMemo(() => {
    if (booking.status !== "active") {
      return "Бронирование не активно";
    }
    if (moment(booking.bookedFor).isBefore(new Date())) {
      return "Мероприятие прошло";
    }
    if (booking.alreadyPaidPrice.cents > 0) {
      return "Бронирование было частично или полностью оплачено";
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
