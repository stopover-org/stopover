import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useRefundBookingForm_BookingFragment$key } from "artifacts/useRefundBookingForm_BookingFragment.graphql";
import { useRefundBookingForm_RefundBookingMutation } from "artifacts/useRefundBookingForm_RefundBookingMutation.graphql";

interface RefundBookingFormFields {
  bookingId: string;
}

function useDefaultValues(
  bookingFragmentRef: useRefundBookingForm_BookingFragment$key
) {
  const booking = useFragment(
    graphql`
      fragment useRefundBookingForm_BookingFragment on Booking {
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

export function useRefundBookingForm(
  bookingFragmentRef: useRefundBookingForm_BookingFragment$key,
  onSuccess: () => void
) {
  return useMutationForm<
    RefundBookingFormFields,
    useRefundBookingForm_RefundBookingMutation
  >(
    graphql`
      mutation useRefundBookingForm_RefundBookingMutation(
        $input: CancelBookingInput!
      ) {
        cancelBooking(input: $input) {
          booking {
            ...BookingScene_FirmBookingFragment
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
