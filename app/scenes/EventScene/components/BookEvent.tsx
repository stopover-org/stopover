import React from "react";
import { Box, Grid, Option } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { Moment } from "moment";
import { BookEvent_EventFragment$key } from "./__generated__/BookEvent_EventFragment.graphql";
import DateCalendar from "../../../components/v2/DateCalendar/DateCalendar";
import { dateFormat, setTime, timeFormat } from "../../../lib/utils/dates";
import Input from "../../../components/v2/Input";
import Select from "../../../components/v2/Select";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Typography from "../../../components/v2/Typography";
import Button from "../../../components/v2/Button";
import useFormContext from "../../../lib/hooks/useFormContext";
import useUniqueMomentDates from "../../../lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "../../../lib/hooks/useTimeFromDate";
import Link from "../../../components/v2/Link";

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
  const { useFormField } = useFormContext();
  const dateField = useFormField<Moment>("date");
  const attendeesCountField = useFormField("attendeesCount");
  const availableDates = useUniqueMomentDates(event.availableDates as Date[]);
  const availableTimes = useTimeFromDate(availableDates, dateField.value);
  const isValidTime = availableTimes.includes(
    dateField?.value?.format(timeFormat)
  );

  const alreadyBooked = React.useMemo(
    () => event?.myBookings?.length! > 0,
    [event]
  );

  return (
    <Grid container>
      <Grid xs={6}>
        <DateCalendar
          availableDates={alreadyBooked ? [dateField.value] : availableDates}
          value={dateField.value}
          disablePast
          sx={{
            maxWidth: "100%",
          }}
          onChange={(date) => {
            if (alreadyBooked) return;
            if (!date) return;
            dateField.onChange(date.startOf("day"));
          }}
          disabled={alreadyBooked}
        />
      </Grid>
      <Grid xs={6}>
        <Box paddingBottom="10px">
          <Input
            label="Date of Event"
            value={dateField.value?.format(dateFormat)}
            disabled
          />
        </Box>
        <Box paddingBottom="10px">
          <Select
            label="Choose Time"
            onChange={(_, value) => {
              if (!value) return;
              const time = (value as string).split("-")[0];
              dateField.onChange(setTime(dateField.value, time));
            }}
            value={`${dateField.value.format(
              timeFormat
            )}-${dateField.value?.toISOString()}`}
            placeholder="Select time"
            disabled={alreadyBooked}
          >
            {availableTimes.map((time, index) => (
              <Option
                key={`${index}-${time}-${dateField.value?.toISOString()}`}
                value={`${time}-${dateField.value?.toISOString()}`}
              >
                {time}
              </Option>
            ))}
          </Select>
        </Box>
        <Box paddingBottom="10px">
          <Input
            label="Attendees Count"
            type="number"
            value={attendeesCountField.value}
            onChange={attendeesCountField.onChange}
            disabled={alreadyBooked}
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
          {!alreadyBooked && (
            <Button
              type="submit"
              disabled={!dateField.value.isValid() || !isValidTime}
            >
              Book Event
            </Button>
          )}
          {alreadyBooked && (
            <Link href="/trips">
              <Button>My Trips</Button>
            </Link>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookEvent);
