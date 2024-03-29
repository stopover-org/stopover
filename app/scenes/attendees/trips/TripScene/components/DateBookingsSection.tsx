import React from "react";
import { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import { Grid, Stack } from "@mui/joy";
import Typography from "components/v2/Typography/Typography";
import { dayMonthFormat } from "lib/utils/dates";
import { DateBookingsSection_TripFragment$key } from "artifacts/DateBookingsSection_TripFragment.graphql";
import BookingCard from "./BookingCard";

interface DateBookingsSectionProps {
  tripFragmentRef: DateBookingsSection_TripFragment$key;
  date: Moment;
}

const DateBookingsSection = ({
  tripFragmentRef,
  date,
}: DateBookingsSectionProps) => {
  const [serverSide, setServerSide] = React.useState(true);
  React.useEffect(() => {
    setServerSide(false);
  }, []);

  const trip = useFragment(
    graphql`
      fragment DateBookingsSection_TripFragment on Trip {
        bookings {
          id
          bookedFor
          ...BookingCard_BookingFragment
        }
      }
    `,
    tripFragmentRef
  );

  const bookings = React.useMemo(
    () =>
      trip.bookings.filter((booking) => date.isSame(booking.bookedFor, "day")),
    [trip, date]
  );

  React.useEffect(() => {
    if (serverSide) {
      return;
    }

    const domNode = window.document.getElementById(
      window.document.location.hash.replace("#", "")
    );

    if (domNode) {
      domNode.scrollIntoView();
    }
  }, [serverSide]);

  if (serverSide) return null;

  return (
    <Grid xs={12}>
      <Typography level="h3">{date.format(dayMonthFormat)}</Typography>
      <Stack>
        {bookings.map((booking) => (
          <BookingCard key={booking.id} bookingFragmentRef={booking} />
        ))}
      </Stack>
    </Grid>
  );
};

export default React.memo(DateBookingsSection);
