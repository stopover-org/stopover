import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Option, Stack } from "@mui/joy";
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
        }
      }
    `,
    eventFragmentRef
  );
  const { useFormField } = useFormContext();
  const dateField = useFormField("date");
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
    dateField.value && (
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
              }}
              disabled={alreadyBooked}
            >
              {getDate(dateField.value)}
            </ButtonDatePicker>
          </Box>
          <Box paddingRight="10px">
            <Select
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
          <Box>
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
              parseInt(attendeesCountField.value, 10) *
                (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
        </Stack>
      </>
    )
  );
};

export default React.memo(EventActions);
