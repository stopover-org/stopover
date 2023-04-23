import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Option, Stack } from "@mui/joy";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import { EventActions_EventFragment$key } from "./__generated__/EventActions_EventFragment.graphql";
import Button from "../../../components/v2/Button";
import { dateFormat, getDate } from "../../../lib/utils/dates";
import ButtonDatePicker from "../../../components/v2/ButtonDatePicker";
import useClosestDate from "../../../lib/hooks/useClosestDate";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Typography from "../../../components/v2/Typography";
import useUniqueMomentDates from "../../../lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "../../../lib/hooks/useTimeFromDate";
import Select from "../../../components/v2/Select";

interface EventActionsProps {
  eventFragmentRef: EventActions_EventFragment$key;
}

const EventActions = ({ eventFragmentRef }: EventActionsProps) => {
  const router = useRouter();
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
      }
    `,
    eventFragmentRef
  );
  const closestDate = useClosestDate(event.availableDates as Date[]);
  const availableDates = useUniqueMomentDates(event.availableDates as Date[]);
  const parsedDate = React.useMemo(() => {
    const date = moment(router.query.date, dateFormat);
    if (availableDates.find((dt) => dt.isSame(date, "day"))) {
      if (date.isValid()) return date;
    }
    return closestDate;
  }, []);

  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(
    parsedDate
  );
  const availableTimes = useTimeFromDate(availableDates, selectedDate);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  return (
    selectedDate && (
      <>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Box paddingRight="10px">
            <ButtonDatePicker
              onChange={(date) => {
                setSelectedTime(null);

                setSelectedDate(date);
              }}
              variant="outlined"
              datePickerProps={{
                availableDates,
              }}
            >
              {getDate(selectedDate)}
            </ButtonDatePicker>
          </Box>
          <Box paddingRight="10px">
            <Select
              onChange={(_, value) => {
                if (!value) return;
                setSelectedTime((value as string).split("-")[0]);
              }}
              placeholder="Select time"
            >
              {availableTimes.map((time, index) => (
                <Option
                  key={`${index}-${time}-${selectedDate?.toISOString()}`}
                  value={`${time}-${selectedDate?.toISOString()}`}
                >
                  {time}
                </Option>
              ))}
            </Select>
          </Box>
          <Box>
            <Button disabled={!selectedDate || !selectedTime}>
              Book Event
            </Button>
          </Box>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end" paddingTop="10px">
          <Typography>
            Price for {event.unit.name}:{" "}
            {getCurrencyFormat(
              event.attendeePricePerUom?.cents,
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
        </Stack>
      </>
    )
  );
};

export default React.memo(EventActions);
