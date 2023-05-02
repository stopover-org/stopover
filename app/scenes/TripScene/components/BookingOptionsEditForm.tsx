import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import { BookingOptionsEditForm_BookingFragment$key } from "./__generated__/BookingOptionsEditForm_BookingFragment.graphql";
import Typography from "../../../components/v2/Typography";
import EventOptionEditForm from "./EventOptionEditForm";

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
        eventOptions {
          id
          builtIn
          ...EventOptionEditForm_EventOptionFragment
        }
      }
    `,
    bookingFragmentRef
  );

  const commonOptions = React.useMemo(
    () => booking.eventOptions.filter((option) => !option.builtIn),
    [booking]
  );

  const builtInOptions = React.useMemo(
    () => booking.eventOptions.filter((option) => option.builtIn),
    [booking]
  );

  return (
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
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export default React.memo(BookingOptionsEditForm);
