import React from "react";
import { Box, Grid, Option } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { Moment } from "moment";
import DateCalendar from "../../../../../components/v2/DateCalendar/DateCalendar";
import {
  dateFormat,
  setTime,
  timeFormat,
} from "../../../../../lib/utils/dates";
import Input from "../../../../../components/v2/Input";
import Select from "../../../../../components/v2/Select";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import Button from "../../../../../components/v2/Button";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import useUniqueMomentDates from "../../../../../lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "../../../../../lib/hooks/useTimeFromDate";
import Link from "../../../../../components/v2/Link";
import { BookEvent_EventFragment$key } from "../../../../../artifacts/BookEvent_EventFragment.graphql";
import SubmitButton from "../../../../../components/shared/SubmitButton";

interface BookEventProps {
  eventFragmentRef: BookEvent_EventFragment$key;
}

const BookEvent = ({ eventFragmentRef }: BookEventProps) => {
  const event = useFragment(
    graphql`
      fragment BookEvent_EventFragment on Event {
        id
        availableDates
        myBookings {
          bookedFor
          trip {
            id
          }
          attendees {
            id
          }
        }
        attendeePricePerUom {
          cents
          currency {
            name
          }
        }
      }
    `,
    eventFragmentRef
  );
  const { useFormField, ...form } = useFormContext();
  const dateField = useFormField<Moment>("date");
  const attendeesCountField = useFormField("attendeesCount");
  const availableDates = useUniqueMomentDates(event.availableDates as Date[]);
  const availableTimes = useTimeFromDate(availableDates, dateField.value);
  const isValidTime = availableTimes.filter((dt) =>
    dt.isSame(dateField?.value)
  ).length;

  const bookedDates = useUniqueMomentDates(
    event.myBookings.map((b) => b.bookedFor)
  );

  const booking = React.useMemo(
    () => event.myBookings.find((b) => dateField.value.isSame(b.bookedFor)),
    [dateField.value, bookedDates]
  );

  const selectedTime = React.useMemo(
    () => dateField.value.format(timeFormat),
    [dateField]
  );

  return (
    <Grid container>
      <Grid xs={6}>
        <DateCalendar
          availableDates={availableDates}
          highlightedDates={bookedDates}
          value={dateField.value}
          disablePast
          sx={{
            maxWidth: "100%",
          }}
          onChange={(date) => {
            if (!date) return;
            dateField.onChange(date.startOf("day"));
          }}
        />
      </Grid>
      <Grid xs={6}>
        <Box paddingBottom="10px">
          <Input
            label="Date of Event"
            value={dateField.value?.format(dateFormat)}
            readOnly
          />
        </Box>
        <Box paddingBottom="10px">
          <Select
            label="Choose Time"
            onChange={(value: string) => {
              if (!value) return;

              dateField.onChange(setTime(dateField.value, value));
            }}
            value={selectedTime}
            placeholder="Select time"
          >
            {availableTimes.map((time) => (
              <Option key={time.unix()} value={time.format(timeFormat)}>
                {time.format(timeFormat)}
              </Option>
            ))}
          </Select>
        </Box>
        <Box paddingBottom="10px">
          <Input
            label="Attendees Count"
            type="number"
            value={
              booking
                ? booking.attendees.length.toString()
                : attendeesCountField.value.toString()
            }
            onChange={(value) => {
              if (parseInt(value, 10) > 0) {
                attendeesCountField.onChange(value);
              } else {
                attendeesCountField.onChange(1);
              }
            }}
            readOnly={Boolean(booking)}
          />
        </Box>
        <Box paddingBottom="10px">
          <Typography textAlign="end" level="h3">
            {getCurrencyFormat(
              parseInt(attendeesCountField.value, 10) *
                (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
        </Box>
        <Box textAlign="end">
          {!booking && (
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={!dateField.value.isValid() || !isValidTime}
            >
              Book Event
            </SubmitButton>
          )}
          {booking && (
            <Link href={`/trips/${booking.trip.id}`} underline={false}>
              <Button>My Trips</Button>
            </Link>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookEvent);
