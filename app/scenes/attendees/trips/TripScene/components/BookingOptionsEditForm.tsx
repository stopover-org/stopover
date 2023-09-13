import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { BookingOptionsEditForm_BookingFragment$key } from "../../../../../artifacts/BookingOptionsEditForm_BookingFragment.graphql";
import Typography from "../../../../../components/v2/Typography";
import EventOptionEditForm from "./EventOptionEditForm";
import { useBookingEditForm } from "./useBookingEditForm";

interface BookingOptionsEditFormProps {
  bookingFragmentRef: BookingOptionsEditForm_BookingFragment$key;
}

const BookingOptionsEditForm = ({
  bookingFragmentRef,
}: BookingOptionsEditFormProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingOptionsEditForm_BookingFragment on Booking {
        id
        status
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
  const form = useBookingEditForm(booking, booking.alreadyPaidPrice.cents > 0);

  return (
    <FormProvider {...form}>
      <form>
        <Grid container>
          {commonOptions.length > 0 && (
            <>
              <Grid xs={12}>
                <Typography>Additional Options</Typography>
              </Grid>
              {commonOptions.map((option) => (
                <EventOptionEditForm
                  key={option.id}
                  eventOptionFragmentRef={option}
                  bookingFragmentRef={booking}
                />
              ))}
            </>
          )}
          {builtInOptions.length > 0 && (
            <>
              <Grid xs={12}>
                <Typography>Built In Options</Typography>
              </Grid>
              {builtInOptions.map((option) => (
                <EventOptionEditForm
                  key={option.id}
                  eventOptionFragmentRef={option}
                  bookingFragmentRef={booking}
                />
              ))}
            </>
          )}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(BookingOptionsEditForm);
