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
  paymentMethod: string;
}

function useDefaultValues(
  bookingFragmentRef: useCheckoutForm_BookingFragment$key
): CreateCheckoutFields {
  const booking = useFragment(
    graphql`
      fragment useCheckoutForm_BookingFragment on Booking {
        id
        event {
          firm {
            paymentTypes
          }
        }
      }
    `,
    bookingFragmentRef
  );

  const preferredMethod = booking.event.firm.paymentTypes.includes("stripe")
    ? "stripe"
    : "cash";

  return React.useMemo(
    () => ({
      bookingId: booking.id,
      paymentMethod: preferredMethod,
    }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  bookingId: Yup.string().required(),
  paymentMethod: Yup.string().required("Required"),
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
          notification
          errors
        }
      }
    `,
    ({ paymentMethod, ...values }) => ({
      input: {
        ...values,
        paymentType: paymentMethod === "cash" ? "deposit" : "full_amount",
      },
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
