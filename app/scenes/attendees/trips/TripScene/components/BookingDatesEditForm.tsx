import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box, Option, Stack } from "@mui/joy";
import { Moment } from "moment";
import moment from "moment/moment";
import { BookingDatesEditForm_BookingFragment$key } from "../../../../../artifacts/BookingDatesEditForm_BookingFragment.graphql";
import { useBookingDatesEditForm } from "./useBookingDatesEditForm";
import ButtonDatePicker from "../../../../../components/v2/ButtonDatePicker/ButtonDatePicker";
import { getDate, setTime, timeFormat } from "../../../../../lib/utils/dates";
import Select from "../../../../../components/v2/Select/Select";
import useUniqueMomentDates from "../../../../../lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "../../../../../lib/hooks/useTimeFromDate";
import Button from "../../../../../components/v2/Button/Button";
import SubmitButton from "../../../../../components/shared/SubmitButton";

interface BookingDatesEditFormProps {
  bookingFragmentRef: BookingDatesEditForm_BookingFragment$key;
}

const BookingDatesEditForm = ({
  bookingFragmentRef,
}: BookingDatesEditFormProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingDatesEditForm_BookingFragment on Booking {
        status
        bookedFor
        event {
          availableDates
        }
        ...useBookingDatesEditForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useBookingDatesEditForm(booking);
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
  return (
    <form onSubmit={form.handleSubmit()}>
      <Stack flexDirection="row" justifyContent="flex-start">
        <Box paddingRight="10px">
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
        <Box paddingRight="10px">
          {" "}
          <Select
            onChange={(value: string) => {
              if (!value) return;

              timeField.onChange(value);
            }}
            value={timeField.value}
            placeholder="Select time"
          >
            {availableTimes.map((time) => (
              <Option key={time.unix()} value={time.format(timeFormat)}>
                {time.format(timeFormat)}
              </Option>
            ))}
          </Select>
        </Box>
        {!disabled && (
          <Box>
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={disabled}
            >
              Change Dates
            </SubmitButton>
          </Box>
        )}
      </Stack>
    </form>
  );
};

export default React.memo(BookingDatesEditForm);
