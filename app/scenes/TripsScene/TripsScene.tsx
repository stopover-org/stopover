import React from "react";
import { graphql, useFragment } from "react-relay";
import moment from "moment";
import { Grid, Stack } from "@mui/joy";
import { TripsScene_TripsFragment$key } from "./__generated__/TripsScene_TripsFragment.graphql";
import Typography from "../../components/v2/Typography";
import TripCard from "./components/TripCard";

interface TripsSceneProps {
  accountFragmentRef: TripsScene_TripsFragment$key;
}

const TripsScene = ({ accountFragmentRef }: TripsSceneProps) => {
  const { trips } = useFragment(
    graphql`
      fragment TripsScene_TripsFragment on Account {
        trips {
          id
          status
          startDate
          endDate
          ...TripCard_TripFragment
        }
      }
    `,
    accountFragmentRef
  );

  const draftTrips = React.useMemo(
    () => trips.filter((trip) => trip.status === "draft"),
    [trips]
  );

  const activeTrips = React.useMemo(
    () =>
      trips.filter(
        (trip) =>
          trip.status === "active" &&
          moment(trip.startDate).isSameOrBefore(moment(), "day") &&
          moment(trip.endDate).isSameOrAfter(moment(), "day")
      ),
    [trips]
  );

  const futureTrips = React.useMemo(
    () =>
      trips.filter(
        (trip) =>
          trip.status === "active" &&
          moment(trip.startDate).isAfter(moment(), "day")
      ),
    [trips]
  );

  const pastTrips = React.useMemo(
    () =>
      trips.filter(
        (trip) =>
          trip.status === "active" &&
          moment(trip.endDate).isBefore(moment(), "day")
      ),
    [trips]
  );
  return (
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Typography level="h3">Drafts</Typography>
      </Grid>
      <Grid xs={12}>
        <Stack flexDirection="row" flexWrap="wrap">
          {draftTrips.map((trip) => (
            <TripCard key={trip.id} tripFragmentRef={trip} />
          ))}
        </Stack>
      </Grid>

      <Grid xs={12}>
        <Typography level="h3">Active</Typography>
      </Grid>
      <Grid xs={12}>
        <Stack>
          {activeTrips.map((trip) => (
            <TripCard key={trip.id} tripFragmentRef={trip} />
          ))}
        </Stack>
      </Grid>

      <Grid xs={12}>
        <Typography level="h3">Future</Typography>
      </Grid>
      <Grid xs={12}>
        <Stack>
          {futureTrips.map((trip) => (
            <TripCard key={trip.id} tripFragmentRef={trip} />
          ))}
        </Stack>
      </Grid>

      <Grid xs={12}>
        <Typography level="h3">Past</Typography>
      </Grid>
      <Grid xs={12}>
        <Stack>
          {pastTrips.map((trip) => (
            <TripCard key={trip.id} tripFragmentRef={trip} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(TripsScene);
