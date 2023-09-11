import moment, { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setTime, timeFormat } from "../../../../../lib/utils/dates";
import useMutationForm from "../../../../../lib/hooks/useMutationForm";
import { useBookingDatesEditForm_BookingFragment$key } from "../../../../../artifacts/useBookingDatesEditForm_BookingFragment.graphql";

interface BookingDatesEditFormFields {
  bookingId: string;
  date: Moment;
  time: string;
}

function useDefaultValues(
  bookingFragmentRef: useBookingDatesEditForm_BookingFragment$key
): BookingDatesEditFormFields {
  const booking = useFragment(
    graphql`
      fragment useBookingDatesEditForm_BookingFragment on Booking {
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
  bookingFragmentRef: useBookingDatesEditForm_BookingFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useBookingDatesEditForm_UpdateBookingMutation(
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
    }
  );
}
