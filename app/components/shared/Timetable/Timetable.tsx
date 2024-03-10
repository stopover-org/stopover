import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import React from "react";
import { Timetable_EventsConnectionFragment$key } from "artifacts/Timetable_EventsConnectionFragment.graphql";
import { Box, Divider, Grid, IconButton, Stack } from "@mui/joy";
import { useTimetable } from "lib/hooks/useTimetable";
import moment, { Moment } from "moment";
import { dateTimeFormat, timeFormat, urlSafeDateFormat } from "lib/utils/dates";
import Link from "components/v2/Link";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Timetable_AccountQuery } from "artifacts/Timetable_AccountQuery.graphql";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import TimetableBookEvent from "./TimetableBookEvent";
import Button from "../../v2/Button";
import DatePicker from "../../v2/DatePicker/DatePicker";

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
  const [serverSide, setServerSide] = React.useState(true);
  React.useEffect(() => {
    setServerSide(false);
  }, []);

  React.useEffect(() => {
    if (serverSide) {
      return;
    }

    const domNode = window.document.getElementById("event-startview-from");

    if (domNode) {
      domNode.scrollIntoView();
    }
  }, [serverSide]);
  const timetable = useTimetable(data?.nodes, timetableDate);
  const pathname = usePathname();
  const params = useParams();
  const basePathname = React.useMemo(() => {
    if (params.date) {
      return pathname.split("/").slice(0, -1).join("/");
    }
    return pathname;
  }, [pathname, params]);
  const { t } = useTranslation();
  const router = useRouter();
  const isToday = React.useMemo(() => {
    if (params.date) {
      return moment().isSame(moment(params.date, urlSafeDateFormat), "day");
    }
    return true;
  }, [params]);

  const isTomorrow = React.useMemo(() => {
    if (params.date) {
      return moment()
        .add(1, "days")
        .isSame(moment(params.date, urlSafeDateFormat), "day");
    }
    return false;
  }, [params]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          alignItems="flex-end"
        >
          <Box>
            <Link href={basePathname} underline={false}>
              <Button
                size="lg"
                color="primary"
                variant={isToday ? "solid" : "outlined"}
              >
                Today
              </Button>
            </Link>
          </Box>
          <Box>
            <Link
              href={`${basePathname}/${moment()
                .add(1, "days")
                .format(urlSafeDateFormat)}`}
              underline={false}
            >
              <Button
                size="lg"
                color="primary"
                variant={isTomorrow ? "solid" : "outlined"}
              >
                Tomorrow
              </Button>
            </Link>
          </Box>
          <Divider orientation="vertical" sx={{ margin: "0 10px" }} />
          <Box>
            <DatePicker
              label={t("datepicker.selectDate")}
              value={
                params.date ? moment(params.date, urlSafeDateFormat) : null
              }
              onChange={(dt) => {
                if (dt && dt.isValid()) {
                  router.push(
                    `${basePathname}/${dt.format(urlSafeDateFormat)}`
                  );
                }
              }}
              disablePast
            />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} padding="10px 0">
        <Divider />
      </Grid>
      {Object.entries(timetable).map(([datetime, events], index: number) => {
        const momentDatetime = moment(datetime);
        const isFuture = momentDatetime.isAfter(new Date(), "minute");
        if (!momentDatetime.isValid()) {
          return null;
        }

        return (
          <React.Fragment key={momentDatetime.format(dateTimeFormat)}>
            {events.map((event: any, i: number) => (
              <React.Fragment key={event.id}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                    useFlexGap
                  >
                    <Box
                      id={isFuture ? "event-startview-from" : undefined}
                      sx={{
                        width: "40px",
                      }}
                    >
                      {i === 0 && momentDatetime.format(timeFormat)}
                    </Box>
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
