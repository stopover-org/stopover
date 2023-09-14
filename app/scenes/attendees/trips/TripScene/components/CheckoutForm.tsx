import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Option } from "@mui/joy";
import { CheckoutForm_BookingFragmentRef$key } from "../../../../../artifacts/CheckoutForm_BookingFragmentRef.graphql";
import Button from "../../../../../components/v2/Button";
import { useCheckoutForm } from "./useCheckoutForm";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import Select from "../../../../../components/v2/Select";
import { timeFormat } from "../../../../../lib/utils/dates";
import { capitalize } from "../../../../../lib/utils/capitalize";
import Typography from "../../../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";

interface CheckoutFormProps {
  bookingFragmentRef: CheckoutForm_BookingFragmentRef$key;
}

const CheckoutForm = ({ bookingFragmentRef }: CheckoutFormProps) => {
  const booking = useFragment<CheckoutForm_BookingFragmentRef$key>(
    graphql`
      fragment CheckoutForm_BookingFragmentRef on Booking {
        status
        bookedFor
        paymentType
        event {
          firm {
            paymentTypes
          }
          depositAmount {
            cents
            currency {
              name
            }
          }
        }
        ...useCheckoutForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCheckoutForm(booking);
  const paymentMethodField = form.useFormField("paymentMethod");
  const disabled = React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );

  if (booking.event.firm.paymentTypes.length === 0) {
    return <Typography>There is no available payment methods. Yet</Typography>;
  }

  return (
    <form onSubmit={form.handleSubmit()}>
      {!booking.paymentType && (
        <Select {...paymentMethodField} placeholder="Select Payment Method">
          {booking.event.firm.paymentTypes.map((paymentType) => (
            <Option key={paymentType} value={paymentType}>
              {capitalize(paymentType)}
            </Option>
          ))}
        </Select>
      )}
      <br />
      <SubmitButton
        submitting={form.formState.isSubmitting}
        disabled={disabled}
      >
        {paymentMethodField.value === "cash"
          ? `Pay Deposit ${getCurrencyFormat(
              booking.event.depositAmount?.cents,
              booking.event.depositAmount?.currency.name
            )}`
          : "Pay Now"}
      </SubmitButton>
    </form>
  );
};

export default React.memo(CheckoutForm);
