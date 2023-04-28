import React from "react";
import { Box, Grid, Option } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment, { Moment } from "moment";
import { useRouter } from "next/router";
import { BookEvent_EventFragment$key } from "./__generated__/BookEvent_EventFragment.graphql";
import DateCalendar from "../../../components/v2/DateCalendar/DateCalendar";
import useTimeFromDate from "../../../lib/hooks/useTimeFromDate";
import useUniqueMomentDates from "../../../lib/hooks/useUniqueMomentDates";
import useClosestDate from "../../../lib/hooks/useClosestDate";
import { dateFormat } from "../../../lib/utils/dates";
import Input from "../../../components/v2/Input";
import Select from "../../../components/v2/Select";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Typography from "../../../components/v2/Typography";

interface BookEventProps {
  eventFragmentRef: BookEvent_EventFragment$key;
}

const BookEvent = ({ eventFragmentRef }: BookEventProps) => {
  const router = useRouter();
  const event = useFragment(
    graphql`
      fragment BookEvent_EventFragment on Event {
        id
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
  const [attendeesCount, setAttendeesCount] = React.useState("1");

  return (
    <Grid container>
      <Grid xs={6}>
        <DateCalendar
          availableDates={availableDates}
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </Grid>
      <Grid xs={6}>
        <Box paddingBottom="10px">
          <Input
            label="Date of Event"
            value={selectedDate?.format(dateFormat)}
            disabled
          />
        </Box>
        <Box paddingBottom="10px">
          <Select
            label="Choose Time"
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
        <Box paddingBottom="10px">
          <Input
            label="Attendees Count"
            type="number"
            value={attendeesCount}
            onChange={setAttendeesCount}
          />
        </Box>
        <Box>
          <Typography textAlign="end" level="h3">
            {getCurrencyFormat(
              parseInt(attendeesCount, 10) *
                (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} />
    </Grid>
  );
};

export default React.memo(BookEvent);
