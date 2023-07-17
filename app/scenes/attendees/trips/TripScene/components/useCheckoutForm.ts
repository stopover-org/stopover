import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useMutationForm from "../../../../../lib/hooks/useMutationForm";
import { useCheckoutForm_BookingFragment$key } from "../../../../../artifacts/useCheckoutForm_BookingFragment.graphql";
import { useCheckoutForm_CreateCheckoutMutation } from "../../../../../artifacts/useCheckoutForm_CreateCheckoutMutation.graphql";

interface CreateCheckoutFields {
  bookingId: string;
}

function useDefaultValues(
  bookingFragmentRef: useCheckoutForm_BookingFragment$key
): CreateCheckoutFields {
  const booking = useFragment(
    graphql`
      fragment useCheckoutForm_BookingFragment on Booking {
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

export function useCheckoutForm(
  bookingFragmentRef: useCheckoutForm_BookingFragment$key
) {
  const router = useRouter();
  return useMutationForm<
    CreateCheckoutFields,
    useCheckoutForm_CreateCheckoutMutation
  >(
    graphql`
      mutation useCheckoutForm_CreateCheckoutMutation(
        $input: CreateCheckoutInput!
      ) {
        createCheckout(input: $input) {
          url
          booking {
            ...CheckoutForm_BookingFragmentRef
            ...useCheckoutForm_BookingFragment
            ...BookingDatesEditForm_BookingFragment
            ...BookingEditForm_BookingFragment
            ...BookingOptionsEditForm_BookingFragment
            attendees {
              ...AttendeeEditForm_AttendeeFragment
            }
          }
        }
      }
    `,
    (values) => ({
      input: { ...values, paymentType: "full_amount" },
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: (result) => {
        if (result?.createCheckout?.url) {
          router.push(result.createCheckout.url);
        }
      },
    }
  );
}
