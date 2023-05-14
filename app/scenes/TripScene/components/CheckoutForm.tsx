import { graphql, useFragment } from "react-relay";
import React from "react";
import { CheckoutForm_BookingFragmentRef$key } from "./__generated__/CheckoutForm_BookingFragmentRef.graphql";
import Button from "../../../components/v2/Button";
import { useCheckoutForm } from "./useCheckoutForm";

interface CheckoutFormProps {
  bookingFragmentRef: CheckoutForm_BookingFragmentRef$key;
}

const CheckoutForm = ({ bookingFragmentRef }: CheckoutFormProps) => {
  const booking = useFragment(
    graphql`
      fragment CheckoutForm_BookingFragmentRef on Booking {
        ...useCheckoutForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCheckoutForm(booking);

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button type="submit">Pay Now</Button>
    </form>
  );
};

export default React.memo(CheckoutForm);
