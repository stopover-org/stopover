import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import React from "react";
import { Timetable_EventsConnectionFragment$key } from "artifacts/Timetable_EventsConnectionFragment.graphql";
import { Box, Divider, Grid, IconButton, Stack } from "@mui/joy";
import { useTimetable } from "lib/hooks/useTimetable";
import moment, { Moment } from "moment";
import { dateTimeFormat, timeFormat } from "lib/utils/dates";
import Link from "components/v2/Link";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Timetable_AccountQuery } from "artifacts/Timetable_AccountQuery.graphql";
import TimetableBookEvent from "./TimetableBookEvent";

interface TimetableProps {
  eventsConnectionFragmentRef: Timetable_EventsConnectionFragment$key;
  timetableDate?: Moment;
}

const Timetable = ({
  eventsConnectionFragmentRef,
  timetableDate = moment(),
}: TimetableProps) => {
  const dataAccount = useLazyLoadQuery<Timetable_AccountQuery>(
    graphql`
      query Timetable_AccountQuery {
        currentUser {
          account {
            ...TimetableBookEvent_AccountFragment
          }
        }
      }
    `,
    {}
  );

  const data = useFragment<Timetable_EventsConnectionFragment$key>(
    graphql`
      fragment Timetable_EventsConnectionFragment on EventConnection {
        nodes {
          id
          availableDates
          title
          description
          ...TimetableBookEvent_EventFragment
          myBookings {
            bookedFor
            trip {
              id
            }
          }
        }
      }
    `,
    eventsConnectionFragmentRef
  );
  const timetable = useTimetable(data?.nodes, timetableDate);

  return (
    <Grid container spacing={2}>
      {Object.entries(timetable).map(([datetime, events], index: number) => {
        const momentDatetime = moment(datetime);
        if (!momentDatetime.isValid()) {
          return null;
        }

        return (
          <React.Fragment key={momentDatetime.format(dateTimeFormat)}>
            {events.map((event: any) => (
              <React.Fragment key={event.id}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                    useFlexGap
                  >
                    <Box>{momentDatetime.format(timeFormat)}</Box>
                    <Box>
                      <Stack spacing={2} useFlexGap>
                        <Box>
                          <Link href={`/events/${event.id}`}>
                            {event.title}
                          </Link>
                        </Box>
                        <TimetableBookEvent
                          accountFragmentRef={dataAccount.currentUser.account}
                          eventFragmentRef={event}
                          timetableDate={momentDatetime}
                        />
                        <Divider />
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </React.Fragment>
            ))}
            {index !== Object.keys(timetable).length - 1 && (
              <Grid xs={12} sm={12} md={12} lg={12}>
                <IconButton size="sm">
                  <ArrowDownwardIcon />
                </IconButton>
              </Grid>
            )}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default React.memo(Timetable);
