import moment, { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBookingEditForm_BookingFragment$key } from "./__generated__/useBookingEditForm_BookingFragment.graphql";
import { setTime, timeFormat } from "../../../lib/utils/dates";
import useMutationForm from "../../../lib/hooks/useMutationForm";

interface BookingEditFormFields {
  bookingId: string;
  eventOptionIds: string[];
  date: Moment;
  time: string;
}

function useDefaultValues(
  bookingFragmentRef: useBookingEditForm_BookingFragment$key
): BookingEditFormFields {
  const booking = useFragment(
    graphql`
      fragment useBookingEditForm_BookingFragment on Booking {
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
      eventOptionIds: booking.bookingOptions.map(
        ({ eventOption }) => eventOption.id
      ),
    }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required(),
  time: Yup.string().required(),
  eventOptionIds: Yup.array().of(Yup.string().required()).required(),
});

export function useBookingEditForm(
  bookingFragmentRef: useBookingEditForm_BookingFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useBookingEditForm_UpdateBookingAttendeeMutation(
        $updateBookingInput: UpdateBookingInput!
      ) {
        updateBooking(input: $updateBookingInput) {
          booking {
            id
          }
        }
      }
    `,
    ({ date, time, ...values }) => ({
      updateBookingInput: {
        bookedForm: setTime(moment(date), time),
        eventOptionIds: values.eventOptionIds,
      },
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
