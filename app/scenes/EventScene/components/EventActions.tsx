import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import { useRouter } from "next/router";
import moment from "moment";
import { EventActions_EventFragment$key } from "./__generated__/EventActions_EventFragment.graphql";
import Button from "../../../components/v2/Button";
import { dateFormat, getDate } from "../../../lib/utils/dates";
import Typography from "../../../components/v2/Typography";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";

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
        schedules {
          scheduledFor
          id
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

  const parsedDate = React.useMemo(() => {
    const date = moment(router.query.date, dateFormat);
    if (date.isValid()) return date;
    return null;
  }, []);
  const [selectedDate, setSelectedDate] = React.useState(parsedDate);
  return (
    <>
      <Stack flexDirection="row" justifyContent="flex-end">
        <Box paddingRight="10px">
          <Button variant="outlined">{getDate(selectedDate)}</Button>
        </Box>
        <Box>
          <Button>Book Event</Button>
        </Box>
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" paddingTop="10px">
        <Typography>
          Price for {event.unit.name}:{" "}
          {getCurrencyFormat(
            event.attendeePricePerUom.cents,
            event.attendeePricePerUom.currency.name
          )}
        </Typography>
      </Stack>
    </>
  );
};

export default React.memo(EventActions);
