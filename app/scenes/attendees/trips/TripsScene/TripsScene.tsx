import React from "react";
import { graphql, useFragment } from "react-relay";
import moment from "moment";
import { Grid, Stack } from "@mui/joy";
import Typography from "../../../../components/v2/Typography";
import TripCard from "./components/TripCard";
import { TripsScene_AccountFragment$key } from "../../../../artifacts/TripsScene_AccountFragment.graphql";
import Section from "../../../../components/v2/Section";
import { useTranslation } from "react-i18next";

interface TripsSceneProps {
  accountFragmentRef: TripsScene_AccountFragment$key;
}

const TripsScene = ({ accountFragmentRef }: TripsSceneProps) => {
  const data = useFragment(
    graphql`
      fragment TripsScene_AccountFragment on Account {
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

  const trips = data?.trips || [];

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

  const cancelledTrips = React.useMemo(
    () => trips.filter((trip) => trip.status === "cancelled"),
    [trips]
  );

  const { t } = useTranslation()

  return (
    <Grid>
      <Section color={'primary'} variant='soft'>
        <Grid xs={12}>
          <Typography level="h3">{t('scenes.attendees.trips.tripsScene.draft')}</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack flexDirection="row" flexWrap="wrap">
            {draftTrips.map((trip) => (
              <TripCard key={trip.id} tripFragmentRef={trip} />
            ))}
          </Stack>
        </Grid>
      </Section>

      <Section color={'primary'} variant='soft'>
        <Grid xs={12}>
          <Typography level="h3">{t('scenes.attendees.trips.tripsScene.active')}</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            {activeTrips.map((trip) => (
              <TripCard key={trip.id} tripFragmentRef={trip} />
            ))}
          </Stack>
        </Grid>
      </Section>

      <Section color={'primary'} variant='soft'>
        <Grid xs={12}>
          <Typography level="h3">{t('scenes.attendees.trips.tripsScene.future')}</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            {futureTrips.map((trip) => (
              <TripCard key={trip.id} tripFragmentRef={trip} />
            ))}
          </Stack>
        </Grid>
      </Section>

      <Section color={'neutral'} variant='soft'>
        <Grid xs={12}>
          <Typography level="h3" color='neutral'>{t('scenes.attendees.trips.tripsScene.past')}</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} tripFragmentRef={trip} />
            ))}
          </Stack>
        </Grid>
      </Section>
    </Grid>
  );
};

export default React.memo(TripsScene);
