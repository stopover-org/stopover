import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useCheckoutForm_CreateCheckoutMutation } from "./__generated__/useCheckoutForm_CreateCheckoutMutation.graphql";
import { useCancelBookingForm_BookingFragment$key } from "./__generated__/useCancelBookingForm_BookingFragment.graphql";

interface CancelBookingFormFields {
  bookingId: string;
}

function useDefaultValues(
  bookingFragmentRef: useCancelBookingForm_BookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useCancelBookingForm_BookingFragment on Booking {
        id
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(
    () => ({
      bookingId: booking.id,
    }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  bookingId: Yup.string().required(),
});

export function useCancelBookingForm(
  bookingFragmentRef: useCancelBookingForm_BookingFragment$key
) {
  return useMutationForm<
    CancelBookingFormFields,
    useCheckoutForm_CreateCheckoutMutation
  >(
    graphql`
      mutation useCancelBookingForm_RemoveBookingMutation(
        $input: RemoveBookingInput!
      ) {
        removeBooking(input: $input) {
          trip {
            ...DateBookingsSection_TripFragment
            ...TripScene_TripFragment
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
    }
  );
}
