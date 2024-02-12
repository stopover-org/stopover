import React from "react";
import { ButtonGroup, Grid, IconButton, Stack, Tooltip } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "components/v2/Typography";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { BookingSummary_BookingFragment$key } from "artifacts/BookingSummary_BookingFragment.graphql";
import { useAddAttendeeForm } from "components/shared/AddAttendee/useAddAttendeeForm";
import SubmitButton from "components/shared/SubmitButton";
import { useBookingDisabled } from "lib/hooks/useBookingStates";
import { useRemoveAttendeeForm } from "../RemoveAttendeeModal/useRemoveAttendeeForm";

interface BookingSummaryProps {
  bookingFragmentRef: BookingSummary_BookingFragment$key;
  readonly?: boolean;
}

const BookingSummary = ({
  bookingFragmentRef,
  readonly = false,
}: BookingSummaryProps) => {
  const { t } = useTranslation();
  const booking = useFragment(
    graphql`
      fragment BookingSummary_BookingFragment on Booking {
        ...useBookingStates_BookingFragment
        leftToPayPrice {
          cents
          currency {
            name
          }
        }
        alreadyPaidPrice {
          cents
          currency {
            name
          }
        }

        activeAttendees: attendees(
          filters: { status: [registered, not_registered] }
        ) {
          id
          ...useRemoveAttendeeForm_AttendeeFragment
        }
        ...useAddAttendeeForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const addAttendeeForm = useAddAttendeeForm(booking);
  const removeAttendeeForm = useRemoveAttendeeForm(booking.activeAttendees[0]);
  const disabled = useBookingDisabled(booking);

  return (
    <Grid container width="100%" alignItems="center">
      <Grid xs={6}>
        <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
          <Typography
            level="body-md"
            sx={(theme) => ({
              fontSize: "22px",
              [theme.breakpoints.down("sm")]: {
                fontSize: "16px",
              },
            })}
          >
            {t("models.attendee.plural")}:
          </Typography>
          <ButtonGroup
            sx={{
              "--ButtonGroup-separatorColor": "none !important",
            }}
          >
            {!readonly && (
              <form
                onSubmit={removeAttendeeForm.handleSubmit()}
                style={{ padding: 0, margin: 0, border: 0 }}
              >
                <Tooltip title={t("forms.removeAttendee.action")}>
                  <SubmitButton
                    size="lg"
                    disabled={disabled || booking.activeAttendees.length === 1}
                    sx={{ padding: 0, margin: 0, border: 0 }}
                    submitting={addAttendeeF.formState.isSubmitting}
                  >
                    <RemoveIcon />
                  </SubmitButton>
                </Tooltip>
              </form>
            )}
            <IconButton
              size="lg"
              disabled={disabled}
              sx={{ padding: 0, margin: 0, border: 0 }}
            >
              {booking.activeAttendees.length}
            </IconButton>
            {!readonly && (
              <form
                onSubmit={addAttendeeForm.handleSubmit()}
                style={{ padding: 0, margin: 0, border: 0 }}
              >
                <Tooltip title={t("forms.addAttendee.action")}>
                  <SubmitButton
                    size="lg"
                    disabled={disabled}
                    sx={{ padding: 0, margin: 0, border: 0 }}
                    submitting={addAttendeeForm.formState.isSubmitting}
                  >
                    <AddIcon />
                  </SubmitButton>
                </Tooltip>
              </form>
            )}
          </ButtonGroup>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Typography
          sx={(theme) => ({
            fontSize: "32px",
            textAlign: "end",
            [theme.breakpoints.down("sm")]: {
              fontSize: "22px",
            },
          })}
        >
          {getCurrencyFormat(
            booking.leftToPayPrice.cents,
            booking.leftToPayPrice.currency.name
          )}
        </Typography>
        <Typography
          fontSize="sm"
          textAlign="end"
          color="success"
          sx={(theme) => ({
            whiteSpace: "unset",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          })}
        >
          {t("models.booking.attributes.alreadyPaidPrice")}{" "}
          {getCurrencyFormat(
            booking.alreadyPaidPrice.cents,
            booking.alreadyPaidPrice.currency.name
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingSummary);
