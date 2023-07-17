import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBookingEditForm_BookingFragment$key } from "../../../../../artifacts/useBookingEditForm_BookingFragment.graphql";
import useMutationForm from "../../../../../lib/hooks/useMutationForm";

interface BookingEditFormFields {
  bookingId: string;
  eventOptionIds: string[];
}

function useDefaultValues(
  bookingFragmentRef: useBookingEditForm_BookingFragment$key
): BookingEditFormFields {
  const booking = useFragment(
    graphql`
      fragment useBookingEditForm_BookingFragment on Booking {
        id
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
      eventOptionIds: booking.bookingOptions.map(
        ({ eventOption }) => eventOption.id
      ),
    }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  bookingId: Yup.string().required(),
  eventOptionIds: Yup.array().of(Yup.string().required()).required(),
});

export function useBookingEditForm(
  bookingFragmentRef: useBookingEditForm_BookingFragment$key,
  disabled?: boolean
) {
  return useMutationForm(
    graphql`
      mutation useBookingEditForm_UpdateBookingAttendeeMutation(
        $input: UpdateBookingInput!
      ) {
        updateBooking(input: $input) {
          booking {
            ...BookingEditForm_BookingFragment
            id
            bookingOptions {
              id
              eventOption {
                id
              }
            }
          }
        }
      }
    `,
    (values) => ({
      input: values,
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
      autosave: !disabled,
    }
  );
}
