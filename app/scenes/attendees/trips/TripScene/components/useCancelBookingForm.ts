import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../../../lib/hooks/useMutationForm";
import { useCancelBookingForm_BookingFragment$key } from "../../../../../artifacts/useCancelBookingForm_BookingFragment.graphql";
import { useCancelBookingForm_CancelBookingMutation } from "../../../../../artifacts/useCancelBookingForm_CancelBookingMutation.graphql";

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
  bookingFragmentRef: useCancelBookingForm_BookingFragment$key,
  onSuccess: () => void
) {
  return useMutationForm<
    CancelBookingFormFields,
    useCancelBookingForm_CancelBookingMutation
  >(
    graphql`
      mutation useCancelBookingForm_CancelBookingMutation(
        $input: CancelBookingInput!
      ) {
        cancelBooking(input: $input) {
          trip {
            ...DateBookingsSection_TripFragment
            ...TripScene_TripFragment
          }
          notification
          errors
        }
      }
    `,
    (values) => ({
      input: values,
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}
