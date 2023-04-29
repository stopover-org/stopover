import React from "react";
import { graphql, useFragment } from "react-relay";
import moment from "moment";
import { TripsScene_TripsFragment$key } from "./__generated__/TripsScene_TripsFragment.graphql";

interface TripsSceneProps {
  accountFragmentRef: TripsScene_TripsFragment$key;
}

const TripsScene = ({ accountFragmentRef }: TripsSceneProps) => {
  const { trips } = useFragment(
    graphql`
      fragment TripsScene_TripsFragment on Account {
        trips {
          status
          cities
          startDate
          endDate
          attendeesCount
        }
      }
    `,
    accountFragmentRef
  );

  console.log(trips);

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
  return null;
};

export default React.memo(TripsScene);
