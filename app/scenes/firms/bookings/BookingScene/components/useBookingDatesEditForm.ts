import moment, { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBookingDatesEditForm_FirmBookingFragment$key } from "artifacts/useBookingDatesEditForm_FirmBookingFragment.graphql";
import { useBookingDatesEditForm_FirmUpdateBookingMutation } from "artifacts/useBookingDatesEditForm_FirmUpdateBookingMutation.graphql";
import { setTime, timeFormat } from "lib/utils/dates";
import useMutationForm from "lib/hooks/useMutationForm";

interface BookingDatesEditFormFields {
  bookingId: string;
  date: Moment;
  time: string;
}

function useDefaultValues(
  bookingFragmentRef: useBookingDatesEditForm_FirmBookingFragment$key
): BookingDatesEditFormFields {
  const booking = useFragment(
    graphql`
      fragment useBookingDatesEditForm_FirmBookingFragment on Booking {
        id
        bookedFor
        bookingOptions {
          id
          eventOption {
            id
          }
        }
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(
    () => ({
      bookingId: booking.id,
      date: moment(booking.bookedFor).startOf("day"),
      time: moment(booking.bookedFor).format(timeFormat),
    }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  bookingId: Yup.string().required(),
  date: Yup.date().required(),
  time: Yup.string().required(),
});

export function useBookingDatesEditForm(
  bookingFragmentRef: useBookingDatesEditForm_FirmBookingFragment$key,
  onComplete: () => void
) {
  return useMutationForm<
    BookingDatesEditFormFields,
    useBookingDatesEditForm_FirmUpdateBookingMutation
  >(
    graphql`
      mutation useBookingDatesEditForm_FirmUpdateBookingMutation(
        $input: UpdateBookingInput!
      ) {
        updateBooking(input: $input) {
          booking {
            ...BookingDatesEditForm_BookingFragment
            id
          }
          notification
          errors
        }
      }
    `,
    ({ date, time, ...values }) => ({
      input: {
        bookedFor: setTime(moment(date), time).toISOString(),
        ...values,
      },
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}
