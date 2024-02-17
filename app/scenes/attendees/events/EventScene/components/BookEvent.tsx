import React from "react";
import {
  Autocomplete,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  useTheme,
} from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import DateCalendar from "components/v2/DateCalendar/DateCalendar";
import { setTime, timeFormat } from "lib/utils/dates";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import Typography from "components/v2/Typography";
import Button from "components/v2/Button";
import useFormContext from "lib/hooks/useFormContext";
import useUniqueMomentDates from "lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "lib/hooks/useTimeFromDate";
import Link from "components/v2/Link";
import { BookEvent_EventFragment$key } from "artifacts/BookEvent_EventFragment.graphql";
import SubmitButton from "components/shared/SubmitButton";
import { capitalize } from "lib/utils/capitalize";
import PlacesFieldset from "./PlacesFieldset";
import AttendeeCountFieldset from "./AttendeeCountFieldset";

interface BookEventProps {
  eventFragmentRef: BookEvent_EventFragment$key;
}

const BookEvent = ({ eventFragmentRef }: BookEventProps) => {
  const event = useFragment<BookEvent_EventFragment$key>(
    graphql`
      fragment BookEvent_EventFragment on Event {
        id
        availableDates
        ...PlacesFieldset_EventFragment
        eventPlacements {
          id
        }
        schedules {
          nodes {
            ...PlacesFieldset_ScheduleFragment
            scheduledFor
            leftPlaces
            availablePlacesPlacement {
              coordinates
            }
          }
        }
        myBookings {
          bookedFor
          id
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
    () => event.myBookings.find((b) => dateField.value?.isSame(b.bookedFor)),
    [dateField.value, bookedDates]
  );

  const selectedTime = React.useMemo(
    () => dateField.value?.format(timeFormat),
    [dateField]
  );

  const schedule = event.schedules.nodes.find((sch) =>
    moment(sch.scheduledFor).isSame(moment(dateField.value))
  );
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const time = availableTimes[0]?.format(timeFormat);
    if (availableTimes.length === 1 && time && selectedTime !== time) {
      dateField.onChange(setTime(dateField.value, time));
    }
  }, [availableTimes, dateField]);

  return (
    <Grid container justifyContent="center">
      <Grid md={12} sm={12}>
        <Stack spacing={1} useFlexGap alignItems="center">
          <DateCalendar
            availableDates={availableDates}
            highlightedDates={bookedDates}
            value={dateField.value}
            disablePast
            sx={{
              maxWidth: "100%",
              margin: isMobileView ? "0 auto" : "unset",
              padding: 0,
            }}
            onChange={(date) => {
              if (!date) return;
              dateField.onChange(date.startOf("day"));
            }}
          />
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            justifyContent="flex-end"
          >
            <FormControl sx={{ margin: 0, width: "100%" }}>
              <FormLabel>{t("datepicker.selectTime")}</FormLabel>
              <Autocomplete
                disableClearable
                value={
                  selectedTime
                    ? { value: selectedTime, label: selectedTime }
                    : { value: null, label: t("datepicker.selectTime") }
                }
                options={availableTimes.map((time: Moment) => ({
                  label: time.format(timeFormat),
                  value: time.format(timeFormat),
                }))}
                onChange={(_, { value }) => {
                  if (!value) return;

                  dateField.onChange(setTime(dateField.value, value));
                }}
                sx={{ margin: 0, maxWidth: "125px" }}
                size="sm"
              />
            </FormControl>
            {event.eventPlacements.length > 0
              ? schedule &&
                !booking && (
                  <PlacesFieldset
                    booked={!!booking}
                    eventFragmentRef={event}
                    scheduleFragmentRef={schedule}
                  />
                )
              : schedule && <AttendeeCountFieldset booked={!!booking} />}
          </Stack>
          <Typography textAlign="end" level="title-sm" width="240px">
            {getCurrencyFormat(
              event.attendeePricePerUom?.cents,
              event.attendeePricePerUom?.currency?.name
            )}{" "}
            x {booking ? booking.attendees.length : attendeesCountField.value}{" "}
            {t("general.attendee")}
            <br />
            {capitalize(t("general.total"))}:{" "}
            {getCurrencyFormat(
              (booking ? booking.attendees.length : attendeesCountField.value) *
                (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
          {!booking && event.eventPlacements.length === 0 && (
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={!dateField.value?.isValid() || !isValidTime}
            >
              {t("scenes.attendees.events.eventScene.bookEvent")}
            </SubmitButton>
          )}
          {booking && (
            <Link
              href={`/trips/${booking.trip.id}#${booking.id}`}
              underline={false}
            >
              <Button fullWidth>
                {t("scenes.attendees.events.eventScene.details")}
              </Button>
            </Link>
          )}
          {schedule?.leftPlaces && !booking && (
            <Typography textAlign="start">
              {t("models.schedule.attributes.leftPlaces", {
                places: schedule.leftPlaces,
              })}
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookEvent);
