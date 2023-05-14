import moment, { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setTime, timeFormat } from "../../../lib/utils/dates";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useBookingDatesEditForm_BookingFragment$key } from "./__generated__/useBookingDatesEditForm_BookingFragment.graphql";

interface BookingEditFormFields {
  bookingId: string;
  date: Moment;
  time: string;
}

function useDefaultValues(
  bookingFragmentRef: useBookingDatesEditForm_BookingFragment$key
): BookingEditFormFields {
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
      mutation useBookingDatesEditForm_UpdateBookingAttendeeMutation(
        $input: UpdateBookingInput!
      ) {
        updateBooking(input: $input) {
          booking {
            ...BookingDatesEditForm_BookingFragment
            id
          }
        }
      }
    `,
    ({ date, time, ...values }) => {
      console.log(date, time, setTime(moment(date), time));
      return {
        input: {
          bookedFor: setTime(moment(date), time).toISOString(),
          ...values,
        },
      };
    },
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
