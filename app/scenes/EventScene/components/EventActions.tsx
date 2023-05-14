import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Option, Stack } from "@mui/joy";
import { Moment } from "moment";
import { EventActions_EventFragment$key } from "./__generated__/EventActions_EventFragment.graphql";
import Button from "../../../components/v2/Button";
import { getDate, setTime, timeFormat } from "../../../lib/utils/dates";
import ButtonDatePicker from "../../../components/v2/ButtonDatePicker";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Typography from "../../../components/v2/Typography";
import useTimeFromDate from "../../../lib/hooks/useTimeFromDate";
import Select from "../../../components/v2/Select";
import useFormContext from "../../../lib/hooks/useFormContext";
import useUniqueMomentDates from "../../../lib/hooks/useUniqueMomentDates";
import Link from "../../../components/v2/Link";

interface EventActionsProps {
  eventFragmentRef: EventActions_EventFragment$key;
}

const EventActions = ({ eventFragmentRef }: EventActionsProps) => {
  const event = useFragment(
    graphql`
      fragment EventActions_EventFragment on Event {
        id
        unit {
          name
        }
        availableDates
        attendeePricePerUom {
          cents
          currency {
            name
          }
        }
        myBookings {
          id
          bookedFor
          trip {
            id
          }
        }
      }
    `,
    eventFragmentRef
  );
  const { useFormField } = useFormContext();
  const dateField = useFormField<Moment>("date");
  const attendeesCountField = useFormField<number>("attendeesCount");
  const availableDates = useUniqueMomentDates(event.availableDates as Date[]);
  const availableTimes = useTimeFromDate(availableDates, dateField.value);
  const isValidTime = availableTimes.includes(
    dateField?.value?.format(timeFormat)
  );

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

  return availableDates.length > 0 ? (
    <>
      <Stack flexDirection="row" justifyContent="flex-end">
        <Box paddingRight="10px">
          <ButtonDatePicker
            onChange={(date) => {
              if (!date) return;
              dateField.onChange(date.startOf("day"));
            }}
            variant="outlined"
            datePickerProps={{
              availableDates,
              highlightedDates: bookedDates,
            }}
          >
            {getDate(dateField.value)}
          </ButtonDatePicker>
        </Box>
        <Box paddingRight="10px">
          <Select
            onChange={(_, value) => {
              if (!value) return;

              dateField.onChange(setTime(dateField.value, value.toString()));
            }}
            value={selectedTime}
            placeholder="Select time"
          >
            {availableTimes.map((time) => (
              <Option key={time} value={time}
                >
                {time}
              </Option>
            ))}
          </Select>
        </Box>
        <Box>
          {!booking && (
            <Button
              type="submit"
              disabled={!dateField.value.isValid() || !isValidTime}
            >
              Book Event
            </Button>
          )}
          {booking && (
            <Link href={`/trips/${booking.trip.id}`} underline={false}>
              <Button>My Trips</Button>
            </Link>
          )}
        </Box>
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" paddingTop="10px">
        <Typography textAlign="end">
          {getCurrencyFormat(
            event.attendeePricePerUom?.cents,
            event.attendeePricePerUom?.currency?.name
          )}{" "}
          x {attendeesCountField.value} attendee
          <br />
          Total:{" "}
          {getCurrencyFormat(
            attendeesCountField.value *
              (event.attendeePricePerUom?.cents || 0),
            event.attendeePricePerUom?.currency?.name
          )}
        </Typography>
      </Stack>
    </>
  ) : null;
};

export default React.memo(EventActions);
