import { graphql, useFragment } from "react-relay";
import React from "react";
import { Autocomplete, Box, Stack } from "@mui/joy";
import { Moment } from "moment";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import ButtonDatePicker from "components/v2/ButtonDatePicker/ButtonDatePicker";
import { getDate, setTime, timeFormat } from "lib/utils/dates";
import useUniqueMomentDates from "lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "lib/hooks/useTimeFromDate";
import SubmitButton from "components/shared/SubmitButton";
import { BookingDatesEditForm_FirmBookingFragment$key } from "artifacts/BookingDatesEditForm_FirmBookingFragment.graphql";
import { useBookingDatesEditForm } from "./useBookingDatesEditForm";

interface BookingDatesEditFormProps {
  bookingFragmentRef: BookingDatesEditForm_FirmBookingFragment$key;
  onClose: () => void;
}

const BookingDatesEditForm = ({
  bookingFragmentRef,
  onClose,
}: BookingDatesEditFormProps) => {
  const booking = useFragment<BookingDatesEditForm_FirmBookingFragment$key>(
    graphql`
      fragment BookingDatesEditForm_FirmBookingFragment on Booking {
        status
        bookedFor
        event {
          availableDates
        }
        ...useBookingDatesEditForm_FirmBookingFragment
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();
  const form = useBookingDatesEditForm(booking, onClose);
  const dateField = form.useFormField<Moment>("date");
  const timeField = form.useFormField("time");
  const availableDates = useUniqueMomentDates(
    booking.event.availableDates as Date[]
  );
  const availableTimes = useTimeFromDate(availableDates, dateField.value);
  const disabled = React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );

  console.log(timeField, dateField);
  return (
    <form onSubmit={form.handleSubmit()}>
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        spacing={2}
        useFlexGap
      >
        {!disabled && (
          <Box>
            <ButtonDatePicker
              onChange={(date) => {
                if (!date) return;
                dateField.onChange(date.startOf("day"));
              }}
              variant="outlined"
              datePickerProps={{
                availableDates,
              }}
              disabled={disabled}
            >
              {getDate(dateField.value)}
            </ButtonDatePicker>
          </Box>
        )}
        {!disabled && availableTimes.length > 0 && (
          <Box>
            <Autocomplete
              disableClearable
              value={{ value: timeField.value, label: timeField.value }}
              options={availableTimes.map((time: Moment) => ({
                label: time.format(timeFormat),
                value: time.format(timeFormat),
              }))}
              onChange={(event, { value }) => {
                if (!value) return;

                dateField.onChange(setTime(dateField.value, value));

                timeField.onChange(value);
              }}
              sx={{ margin: 0, maxWidth: "125px" }}
            />
          </Box>
        )}
        {!disabled && (
          <Box>
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={disabled}
            >
              {t("general.save")}
            </SubmitButton>
          </Box>
        )}
      </Stack>
    </form>
  );
};

export default React.memo(BookingDatesEditForm);
