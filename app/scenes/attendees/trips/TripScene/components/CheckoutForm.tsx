import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Option } from "@mui/joy";
import { CheckoutForm_BookingFragmentRef$key } from "../../../../../artifacts/CheckoutForm_BookingFragmentRef.graphql";
import { useCheckoutForm } from "./useCheckoutForm";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import Select from "../../../../../components/v2/Select";
import { capitalize } from "../../../../../lib/utils/capitalize";
import Typography from "../../../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { useTranslation } from "react-i18next";

interface CheckoutFormProps {
  bookingFragmentRef: CheckoutForm_BookingFragmentRef$key;
}

const CheckoutForm = ({ bookingFragmentRef }: CheckoutFormProps) => {
  const { t } = useTranslation()
  const booking = useFragment<CheckoutForm_BookingFragmentRef$key>(
    graphql`
      fragment CheckoutForm_BookingFragmentRef on Booking {
        status
        bookedFor
        paymentType
        leftToPayPrice {
          cents
          currency {
            name
          }
        }
        leftToPayDepositPrice {
          cents
          currency {
            name
          }
        }
        event {
          firm {
            paymentTypes
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
    return <Typography>{t('scenes.attendees.trips.tripScene.noAvailablePaymentMethod')}</Typography>;
  }

  return (
    <form onSubmit={form.handleSubmit()}>
      {!booking.paymentType && booking.event.firm.paymentTypes.length !== 1 && (
        <Select {...paymentMethodField} placeholder="Select Payment Method">
          {booking.event.firm.paymentTypes.map((paymentType) => (
            <Option key={paymentType} value={paymentType}>
              {capitalize(t(`models.firm.enums.paymentTypes.${paymentType}`))}
            </Option>
          ))}
        </Select>
      )}
      <br />
      {booking.leftToPayDepositPrice.cents <= 0 && paymentMethodField.value === 'cash' 
        ? <Typography>{t('scenes.attendees.trips.tripScene.justCome')}</Typography> 
        : (
      <SubmitButton
        submitting={form.formState.isSubmitting}
        disabled={disabled}
      >
        {paymentMethodField.value === "cash"
          ? t(`scenes.attendees.trips.tripScene.payDeposit`, { amount: getCurrencyFormat(
              booking.leftToPayDepositPrice?.cents,
              booking.leftToPayDepositPrice?.currency.name
            )})
          : t(`scenes.attendees.trips.tripScene.payOnline`, { amount: getCurrencyFormat(
              booking.leftToPayPrice?.cents,
              booking.leftToPayPrice?.currency.name
            )})
        }
      </SubmitButton>
      )}
    </form>
  );
};

export default React.memo(CheckoutForm);
