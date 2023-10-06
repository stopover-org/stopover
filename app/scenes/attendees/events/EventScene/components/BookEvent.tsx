import React from "react";
import { Box, Grid, Option } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment, { Moment } from "moment";
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
import { useTranslation } from "react-i18next";

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
    () => event.myBookings.find((b) => dateField.value.isSame(b.bookedFor)),
    [dateField.value, bookedDates]
  );

  const selectedTime = React.useMemo(
    () => dateField.value.format(timeFormat),
    [dateField]
  );

  const schedule = event.schedules.nodes.find((sch) => moment(sch.scheduledFor).isSame(moment(dateField.value)))

  const { t } = useTranslation()

  return (
    <Grid container>
      <Grid md={6} sm={12}>
        <DateCalendar
          availableDates={availableDates}
          highlightedDates={bookedDates}
          value={dateField.value}
          disablePast
          sx={{
            maxWidth: "100%",
          }}
          onChange={(date) => {
            if (!date) return;
            dateField.onChange(date.startOf("day"));
          }}
        />
      </Grid>
      <Grid md={6} sm={12} xs={12}>
          <Input
            label={t('datepicker.selectDate')}
            value={dateField.value?.format(dateFormat)}
            readOnly
          />
          <Select
            label={t('datepicker.selectTime')}
            onChange={(value: string) => {
              if (!value) return;

              dateField.onChange(setTime(dateField.value, value));
            }}
            value={selectedTime}
            placeholder="Select time"
          >
            {availableTimes.map((time) => (
              <Option key={time.unix()} value={time.format(timeFormat)}>
                {time.format(timeFormat)}
              </Option>
            ))}
          </Select>
          <Input
            label={t('scenes.attendees.events.eventScene.chooseCount')}
            type="number"
            value={
              booking
                ? booking.attendees.length.toString()
                : attendeesCountField.value.toString()
            }
            onChange={(value) => {
              if (parseInt(value, 10) > 0) {
                attendeesCountField.onChange(value);
              } else {
                attendeesCountField.onChange(1);
              }
            }}
            readOnly={Boolean(booking)}
          />
          <Typography textAlign="end" level="title-lg">
            {getCurrencyFormat(
              parseInt(attendeesCountField.value, 10) *
                (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
          {!booking && (
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={!dateField.value.isValid() || !isValidTime}
            >
              {t('scenes.attendees.events.eventScene.bookEvent')}
            </SubmitButton>
          )}
          {booking && (
            <Link href={`/trips/${booking.trip.id}`} underline={false}>
              <Button>{t('layout.header.myTrips')}</Button>
            </Link>
          )}
          {schedule?.leftPlaces && !booking && <Typography textAlign="start">
            {t('models.schedule.attributes.leftPlaces', { places: schedule.leftPlaces })}
          </Typography> }
      </Grid>
    </Grid>
  );
};

export default React.memo(BookEvent);
