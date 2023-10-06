import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Grid, Option, Stack } from "@mui/joy";
import moment, { Moment } from "moment";
import Button from "../../../../../components/v2/Button";
import { getDate, setTime, timeFormat } from "../../../../../lib/utils/dates";
import ButtonDatePicker from "../../../../../components/v2/ButtonDatePicker";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import useTimeFromDate from "../../../../../lib/hooks/useTimeFromDate";
import Select from "../../../../../components/v2/Select";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import useUniqueMomentDates from "../../../../../lib/hooks/useUniqueMomentDates";
import Link from "../../../../../components/v2/Link";
import { EventActions_EventFragment$key } from "../../../../../artifacts/EventActions_EventFragment.graphql";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import { useTranslation } from "react-i18next";
import { capitalize } from "../../../../../lib/utils/capitalize";
import useSubscription from "../../../../../lib/hooks/useSubscription";

interface EventActionsProps {
  eventFragmentRef: EventActions_EventFragment$key;
}

const EventActions = ({ eventFragmentRef }: EventActionsProps) => {
  const event = useFragment<EventActions_EventFragment$key>(
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
          bookedFor
          trip {
            id
          }
        }
        schedules {
          nodes {
            scheduledFor
            leftPlaces
          }
        }
      }
    `,
    eventFragmentRef
  );

  const { useFormField, ...form } = useFormContext();
  const dateField = useFormField<Moment>("date");
  const attendeesCountField = useFormField<number>("attendeesCount");
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
    () => dateField.value?.format(timeFormat),
    [dateField]
  );

  const schedule = event.schedules.nodes.find((sch) => moment(sch.scheduledFor).isSame(moment(dateField.value)))
  
  const { t } = useTranslation()

  return availableDates.length > 0 ? (
    <>
      <Grid container spacing={1} justifyContent={'flex-end'}>
        <Grid sm={12} md={4} xs={4}>
          <ButtonDatePicker
            onChange={(date) => {
              if (!date) return;
              dateField.onChange(date.startOf("day"));
            }}
            variant="outlined"
            datePickerProps={{
              availableDates,
              highlightedDates: bookedDates,
            }}
          >
            {getDate(dateField.value)}
          </ButtonDatePicker>
        </Grid>
        <Grid sm={12} md={4} xs={4}>
          <Select
            onChange={(value: string) => {
              if (!value) return;

              dateField.onChange(setTime(dateField.value, value));
            }}
            value={selectedTime}
            placeholder={t('datepicker.selectTime')}
          >
            {availableTimes.map((time) => (
              <Option key={time.unix()} value={time.format(timeFormat)}>
                {time.format(timeFormat)}
              </Option>
            ))}
          </Select>
        </Grid>
        <Grid>
          {!booking && (
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={!dateField.value.isValid() || !isValidTime}
              fullWidth
            >
              {t('scenes.attendees.events.eventScene.bookEvent')}
            </SubmitButton>
          )}
          {booking && (
            <Link href={`/trips/${booking.trip.id}`} underline={false}>
              <Button fullWidth>{t('layout.header.myTrips')}</Button>
            </Link>
          )}
        </Grid>
        <Grid sm={12} md={12} xs={12}>
          <Typography textAlign="end">
            {getCurrencyFormat(
              event.attendeePricePerUom?.cents,
              event.attendeePricePerUom?.currency?.name
            )}{" "}
            x {attendeesCountField.value} {t('general.attendee')}
            <br />
            {capitalize(t('general.total'))}:{" "}
            {getCurrencyFormat(
              attendeesCountField.value * (event.attendeePricePerUom?.cents || 0),
              event.attendeePricePerUom?.currency?.name
            )}
          </Typography>
          {schedule?.leftPlaces && !booking && <Typography textAlign="end">
            {t('models.schedule.attributes.leftPlaces', { places: schedule.leftPlaces })}
          </Typography> }
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default React.memo(EventActions);
