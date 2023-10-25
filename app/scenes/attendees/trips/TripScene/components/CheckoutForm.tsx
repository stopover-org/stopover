import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Autocomplete, Grid, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { CheckoutForm_BookingFragmentRef$key } from "../../../../../artifacts/CheckoutForm_BookingFragmentRef.graphql";
import { useCheckoutForm } from "./useCheckoutForm";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import { capitalize } from "../../../../../lib/utils/capitalize";
import Typography from "../../../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { useBookingPayable } from "../../../../../lib/hooks/useBookingStates";

interface CheckoutFormProps {
  bookingFragmentRef: CheckoutForm_BookingFragmentRef$key;
}

const CheckoutForm = ({ bookingFragmentRef }: CheckoutFormProps) => {
  const { t } = useTranslation();
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
        ...useBookingStates_PayableBookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCheckoutForm(booking);
  const paymentMethodField = form.useFormField("paymentMethod");
  const disabled = !useBookingPayable(booking)

  if (booking.event.firm.paymentTypes.length === 0) {
    return (
      <Typography>
        {t("scenes.attendees.trips.tripScene.noAvailablePaymentMethod")}
      </Typography>
    );
  }

  return (
    <form onSubmit={form.handleSubmit()}>
      {booking.leftToPayDepositPrice.cents <= 0 &&
        booking.paymentType === 'cash' ? (
          <Typography>
            {t("scenes.attendees.trips.tripScene.justCome")}
          </Typography>
        ) : (
          <Grid container alignItems="center" spacing={2}>
            {!booking.paymentType && 
              <Grid>
                <Autocomplete
                  disableClearable
                  placeholder={t("models.firm.attributes.paymentType")}
                  options={booking.event.firm.paymentTypes.map((v) => ({
                    label: capitalize(t(`models.firm.enums.paymentTypes.${v}`)),
                    value: v.toLowerCase(),
                  }))}
                  onChange={(event, { value }) => paymentMethodField.onChange(value)}
                  getOptionLabel={(option) => option.label}
                  value={{
                    label: capitalize(t(`models.firm.enums.paymentTypes.${paymentMethodField.value}`)),
                    value: paymentMethodField.value.toLowerCase(),
                  }}
                  sx={{ marginRight: "10px" }}
                  size="md"
                  disabled={disabled}
                />
              </Grid>
            }
            <Grid>
              <SubmitButton
                submitting={form.formState.isSubmitting}
                disabled={disabled}
                size="md"
              >
                {paymentMethodField.value === "cash"
                  ? t(`scenes.attendees.trips.tripScene.payDeposit`, {
                      amount: getCurrencyFormat(
                        booking.leftToPayDepositPrice?.cents,
                        booking.leftToPayDepositPrice?.currency.name
                      ),
                    })
                  : t(`scenes.attendees.trips.tripScene.payOnline`, {
                      amount: getCurrencyFormat(
                        booking.leftToPayPrice?.cents,
                        booking.leftToPayPrice?.currency.name
                      ),
                    })}
              </SubmitButton>
            </Grid>
          </Grid>
        )
      }
    </form>
  );
};

export default React.memo(CheckoutForm);
