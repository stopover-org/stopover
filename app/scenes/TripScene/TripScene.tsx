import React from "react";
import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import moment from "moment";
import Typography from "../../components/v2/Typography";
import Tag from "../../components/v2/Tag";

interface TripSceneProps {
  tripFragmentRef: any;
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
      }
    `,
    tripFragmentRef
  );

  console.log(trip);

  return (
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Typography level="h2" sx={{ display: "flex", alignItems: "center" }}>
          {trip.cities.join(", ")}
          &nbsp;
          <Tag
            href="#"
            fontSize="lg"
            primary
            sx={{ height: "1.5em", display: "inline-block" }}
          >
            {trip.status}
          </Tag>
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography level="h3">
          {moment(trip.startDate).calendar()} -{" "}
          {moment(trip.endDate).calendar()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(TripScene);
