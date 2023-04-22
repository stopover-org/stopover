import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import { EventActions_EventFragment$key } from "./__generated__/EventActions_EventFragment.graphql";
import Button from "../../../components/v2/Button";
import { dateFormat, getDate } from "../../../lib/utils/dates";
import ButtonDatePicker from "../../../components/v2/ButtonDatePicker";
import useClosestDate from "../../../lib/hooks/useClosestDate";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Typography from "../../../components/v2/Typography";

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
  const parsedDate = React.useMemo(() => {
    const date = moment(router.query.date, dateFormat);
    if (date.isValid()) return date;
    return closestDate;
  }, []);

  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(
    parsedDate
  );

  return (
    selectedDate && (
      <>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Box paddingRight="10px">
            <ButtonDatePicker
              onChange={(date) => setSelectedDate(date)}
              variant="outlined"
            >
              {getDate(selectedDate)}
            </ButtonDatePicker>
          </Box>
          <Box>
            <Button>Book Event</Button>
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
