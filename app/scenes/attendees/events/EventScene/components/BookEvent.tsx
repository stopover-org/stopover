import React from "react";
import { Autocomplete, Box, ButtonGroup, FormControl, FormLabel, Grid, IconButton, Option, Stack, Tooltip, useTheme } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import DateCalendar from "../../../../../components/v2/DateCalendar/DateCalendar";
import {
  dateFormat,
  setTime,
  timeFormat,
} from "../../../../../lib/utils/dates";
import Input from "../../../../../components/v2/Input";
import Select from "../../../../../components/v2/Select";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import Button from "../../../../../components/v2/Button";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import useUniqueMomentDates from "../../../../../lib/hooks/useUniqueMomentDates";
import useTimeFromDate from "../../../../../lib/hooks/useTimeFromDate";
import Link from "../../../../../components/v2/Link";
import { BookEvent_EventFragment$key } from "../../../../../artifacts/BookEvent_EventFragment.graphql";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import { capitalize } from "../../../../../lib/utils/capitalize";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMediaQuery } from "@mui/material";
import { isMobile } from "filestack-js";

interface BookEventProps {
  eventFragmentRef: BookEvent_EventFragment$key;
}

const BookEvent = ({ eventFragmentRef }: BookEventProps) => {
  const event = useFragment<BookEvent_EventFragment$key>(
    graphql`
      fragment BookEvent_EventFragment on Event {
        id
        availableDates
        schedules {
          nodes {
            scheduledFor
            leftPlaces
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
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container justifyContent={'center'}>
      <Grid md={12} sm={12}>
        <Stack spacing={1} useFlexGap alignItems={'center'}>
          <DateCalendar
            availableDates={availableDates}
            highlightedDates={bookedDates}
            value={dateField.value}
            disablePast
            sx={{
              maxWidth: "100%",
              margin: isMobileView ? '0 autp' : 'unset',
              padding: 0
            }}
            onChange={(date) => {
              if (!date) return;
              dateField.onChange(date.startOf("day"));
            }}
          />
          <Stack direction={'row'} spacing={1} useFlexGap justifyContent={'flex-end'}>
            <FormControl sx={{ margin: 0, width: '100%' }} >
              <FormLabel>{t('datepicker.selectTime')}</FormLabel>
              <Autocomplete
                disableClearable
                value={{ value: selectedTime, label: selectedTime }}
                options={availableTimes.map((time: Moment) => ({
                  label: time.format(timeFormat),
                  value: time.format(timeFormat)
                }))}
                onChange={(event, { value }) => {
                  if (!value) return;

                  dateField.onChange(setTime(dateField.value, value));
                }}
                sx={{ margin: 0, maxWidth: '125px' }}
                size={'sm'}
              />
            </FormControl>
            <FormControl sx={{margin: 0}}>
              <FormLabel>{t('models.attendee.plural')}</FormLabel>
              <ButtonGroup>
                <Tooltip title={t('forms.removeAttendee.action')}>
                  <IconButton
                    disabled={attendeesCountField.value.length === 1 || !!booking}
                    onClick={() => attendeesCountField.onChange(attendeesCountField.value - 1)}
                    size={'sm'}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
                <IconButton
                  size={'sm'}
                >
                  {attendeesCountField.value}
                </IconButton>
                <Tooltip title={t('forms.addAttendee.action')}>
                  <IconButton
                    disabled={!!booking}
                    onClick={() => attendeesCountField.onChange(attendeesCountField.value + 1)}
                    size={'sm'}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </FormControl>
          </Stack>
          <Typography textAlign="end" level="title-sm" width="240px">
            {getCurrencyFormat(
              event.attendeePricePerUom?.cents,
              event.attendeePricePerUom?.currency?.name
            )}{" "}
            x {booking ? booking.attendees.length : attendeesCountField.value} {t("general.attendee")}
            <br />
            {capitalize(t("general.total"))}:{" "}
            {getCurrencyFormat(
              (booking ? booking.attendees.length : attendeesCountField.value) * (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
          {!booking && (
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={!dateField.value?.isValid() || !isValidTime}
            >
              {t("scenes.attendees.events.eventScene.bookEvent")}
            </SubmitButton>
          )}
          {booking && (
            <Link href={`/trips/${booking.trip.id}#${booking.id}`} underline={false}>
              <Button fullWidth>{t('scenes.attendees.events.eventScene.details')}</Button>
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
