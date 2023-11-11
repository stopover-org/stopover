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
import QRModal from "./QRModal";
import Button from "../../../../../components/v2/Button";
import Link from "../../../../../components/v2/Link";

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
        account {
          user {
            status
          }
        }
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
        ...QRModal_FragmentReference
      }
    `,
    bookingFragmentRef
  );
  const form = useCheckoutForm(booking);
  const paymentMethodField = form.useFormField("paymentMethod");
  const disabled = !useBookingPayable(booking);
  const depositAmount = React.useMemo(() => {
    if (booking.leftToPayDepositPrice.cents === 0) {
      return t("scenes.attendees.trips.tripScene.confirmBooking");
    }
    return t(`scenes.attendees.trips.tripScene.payDeposit`, {
      amount: getCurrencyFormat(
        booking.leftToPayDepositPrice?.cents,
        booking.leftToPayDepositPrice?.currency.name
      ),
    });
  }, [booking]);

  const fullAmount = React.useMemo(
    () => {
      if (booking.leftToPayPrice.cents === 0) {
        return t("scenes.attendees.trips.tripScene.confirmBooking");
      }
      return t(`scenes.attendees.trips.tripScene.payOnline`, {
        amount: getCurrencyFormat(
          booking.leftToPayPrice?.cents,
          booking.leftToPayPrice?.currency.name
        ),
      })
    },
    [booking]
  );

  const paid = React.useMemo(() => {
    if (booking.paymentType === "cash") {
      return booking.leftToPayDepositPrice.cents <= 0;
    }
    if (booking.paymentType === "stripe") {
      return booking.leftToPayPrice.cents <= 0;
    }
    return false;
  }, [booking]);

  const leftToPayLater = React.useMemo(() => {
    if (booking.paymentType === "cash") {
      return getCurrencyFormat(
        booking.leftToPayPrice?.cents,
        booking.leftToPayPrice?.currency.name
      );
    }

    return false;
  }, [booking]);
  const [opened, setOpened] = React.useState(false);
  const notAuthorized = React.useMemo(
    () =>
      booking.account.user.status === "temporary" ||
      booking.account.user.status === "inactive",
    [booking]
  );

  if (notAuthorized) {
    return (
      <Link href="/auth/sign_in" color="primary">
        {t("scenes.attendees.trips.tripScene.requireSignIn")}
      </Link>
    );
  }

  if (booking.event.firm.paymentTypes.length === 0) {
    return (
      <Typography>
        {t("scenes.attendees.trips.tripScene.noAvailablePaymentMethod")}
      </Typography>
    );
  }

  return (
    <>
      <form onSubmit={form.handleSubmit()}>
        {paid ? (
          <>
            <Typography>
              {t("scenes.attendees.trips.tripScene.justCome")}
            </Typography>
            <Typography>
              {leftToPayLater &&
                t("scenes.attendees.trips.tripScene.leftToPayLater", {
                  leftToPayLater,
                })}
            </Typography>
            <Typography
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              color="primary"
              onClick={() => setOpened(true)}
            >
              {t("scenes.attendees.trips.tripScene.showQrCode.action")}
            </Typography>
          </>
        ) : (
          <Grid container alignItems="center" spacing={2}>
            {!booking.paymentType && booking.leftToPayPrice.cents !== 0 && booking.leftToPayDepositPrice.cents !== 0 && (
              <Grid>
                <Autocomplete
                  disableClearable
                  placeholder={t("models.firm.attributes.paymentType")}
                  options={booking.event.firm.paymentTypes.map((v) => ({
                    label: capitalize(t(`models.firm.enums.paymentTypes.${v}`)),
                    value: v.toLowerCase(),
                  }))}
                  onChange={(event, { value }) =>
                    paymentMethodField.onChange(value)
                  }
                  getOptionLabel={(option) => option.label}
                  value={{
                    label: capitalize(
                      t(
                        `models.firm.enums.paymentTypes.${paymentMethodField.value}`
                      )
                    ),
                    value: paymentMethodField.value.toLowerCase(),
                  }}
                  sx={{ marginRight: "10px" }}
                  size="md"
                  disabled={disabled}
                />
              </Grid>
            )}
            <Grid>
              <SubmitButton
                submitting={form.formState.isSubmitting}
                disabled={disabled}
                size="md"
              >
                {paymentMethodField.value === "cash"
                  ? depositAmount
                  : fullAmount}
              </SubmitButton>
            </Grid>
          </Grid>
        )}
      </form>
      <QRModal
        bookingFragmentRef={booking}
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </>
  );
};

export default React.memo(CheckoutForm);
