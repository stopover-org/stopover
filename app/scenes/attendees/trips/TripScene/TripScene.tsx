import React from "react";
import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import moment, { Moment } from "moment";
import Typography from "components/v2/Typography";
import { TripScene_TripFragment$key } from "artifacts/TripScene_TripFragment.graphql";
import DateBookingsSection from "./components/DateBookingsSection";

interface TripSceneProps {
  tripFragmentRef: TripScene_TripFragment$key;
}

const TripScene = ({ tripFragmentRef }: TripSceneProps) => {
  const trip = useFragment(
    graphql`
      fragment TripScene_TripFragment on Trip {
        id
        cities
        startDate
        status
        endDate
        bookings {
          bookedFor
        }
        ...DateBookingsSection_TripFragment
      }
    `,
    tripFragmentRef
  );

  const dates = React.useMemo(
    () =>
      trip.bookings
        .reduce((result: Moment[], booking) => {
          const { bookedFor } = booking;
          if (!result.find((dt) => dt.isSame(bookedFor, "day"))) {
            result.push(moment(bookedFor));
          }

          return result;
        }, [])
        .sort((a, b) => {
          if (!a || !b) return 0;
          return a.isSameOrAfter(b) ? 1 : -1;
        }),
    [trip.bookings]
  );

  return (
    <React.Suspense>
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography level="h2">{trip.cities.join(", ")}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography level="h3">
            {moment(trip.startDate).calendar()} -{" "}
            {moment(trip.endDate).calendar()}
          </Typography>
        </Grid>
        {dates.map((dt) => (
          <DateBookingsSection
            key={dt.toISOString()}
            tripFragmentRef={trip}
            date={dt}
          />
        ))}
      </Grid>
    </React.Suspense>
  );
};

export default React.memo(TripScene);
