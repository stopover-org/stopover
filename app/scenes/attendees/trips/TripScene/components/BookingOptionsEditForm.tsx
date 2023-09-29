import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { BookingOptionsEditForm_BookingFragment$key } from "../../../../../artifacts/BookingOptionsEditForm_BookingFragment.graphql";
import Typography from "../../../../../components/v2/Typography";
import EventOptionEditForm from "./EventOptionEditForm";
import { useBookingEditForm } from "./useBookingEditForm";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface BookingOptionsEditFormProps {
  bookingFragmentRef: BookingOptionsEditForm_BookingFragment$key;
}

const BookingOptionsEditForm = ({
  bookingFragmentRef,
}: BookingOptionsEditFormProps) => {
  const { t } = useTranslation()
  const booking = useFragment<BookingOptionsEditForm_BookingFragment$key>(
    graphql`
      fragment BookingOptionsEditForm_BookingFragment on Booking {
        id
        status
        bookedFor
        alreadyPaidPrice {
          cents
        }
        eventOptions {
          id
          builtIn
          forAttendee
          ...EventOptionEditForm_EventOptionFragment
        }
        ...EventOptionEditForm_BookingFragment
        ...useBookingEditForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  const commonOptions = React.useMemo(
    () =>
      booking.eventOptions.filter(
        (option) => !option.builtIn && !option.forAttendee
      ),
    [booking]
  );

  const builtInOptions = React.useMemo(
    () =>
      booking.eventOptions.filter(
        (option) => option.builtIn && !option.forAttendee
      ),
    [booking]
  );

  const disabled = React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );

  const form = useBookingEditForm(
    booking,
    disabled
  );

  return (
    <FormProvider {...form}>
      <form>
        <Grid xs={12}>
          <Typography>
            {t('scenes.attendees.tripScene.bookignOptionsSubheader')}
          </Typography>
        </Grid>
        {commonOptions.length > 0 && (
          commonOptions.map((option) => (
            <EventOptionEditForm
              key={option.id}
              eventOptionFragmentRef={option}
              bookingFragmentRef={booking}
            />
          ))
        )}
        {builtInOptions.length > 0 && (
          <>
            <Grid xs={12}>
              <Typography>
                {t('scenes.attendees.tripScene.builtIn')}
              </Typography>
              {builtInOptions.map((option) => (
                <EventOptionEditForm
                  key={option.id}
                  eventOptionFragmentRef={option}
                  bookingFragmentRef={booking}
                />
              ))}
            </Grid>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default React.memo(BookingOptionsEditForm);
