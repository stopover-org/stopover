import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { CheckoutForm_BookingFragmentRef$key } from "../../../../../artifacts/CheckoutForm_BookingFragmentRef.graphql";
import Button from "../../../../../components/v2/Button";
import { useCheckoutForm } from "./useCheckoutForm";
import SubmitButton from "../../../../../components/shared/SubmitButton";

interface CheckoutFormProps {
  bookingFragmentRef: CheckoutForm_BookingFragmentRef$key;
}

const CheckoutForm = ({ bookingFragmentRef }: CheckoutFormProps) => {
  const booking = useFragment(
    graphql`
      fragment CheckoutForm_BookingFragmentRef on Booking {
        status
        bookedFor
        ...useCheckoutForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCheckoutForm(booking);
  const disabled = React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        submitting={form.formState.isSubmitting}
        disabled={disabled}
      >
        Pay Now
      </SubmitButton>
    </form>
  );
};

export default React.memo(CheckoutForm);
