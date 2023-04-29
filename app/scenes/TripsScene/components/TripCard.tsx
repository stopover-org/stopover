import React from "react";
import { AspectRatio, Box, Card, CardOverflow, Grid, Stack } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment from "moment";
import Link from "../../../components/v2/Link/Link";
import Typography from "../../../components/v2/Typography/Typography";

const TripCard = ({ tripFragmentRef }: any) => {
  const trip = useFragment(
    graphql`
      fragment TripCard_TripFragment on Trip {
        id
        startDate
        endDate
        attendeesCount
        cities
        images
      }
    `,
    tripFragmentRef
  );

  return (
    <Grid width="420px" padding="10px">
      <Card variant="outlined" sx={{ width: "400px" }} orientation="horizontal">
        <CardOverflow>
          <AspectRatio
            minHeight="130px"
            maxHeight="130px"
            ratio="2"
            sx={{ width: "130px" }}
            objectFit="cover"
          >
            <img src={trip.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <Stack paddingLeft="10px" width="100%" sx={{ position: "relative" }}>
          <Link href={`/trips/${trip.id}`}>
            <Typography
              sx={{
                fontSize: "md",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "250px",
                display: "inline-block",
                overflow: "hidden",
              }}
            >
              {trip.cities.join(", ")}
            </Typography>
          </Link>
          <Box sx={{ paddingTop: "5px" }}>
            <Typography level="body3" sx={{ fontSize: "sm" }}>
              {moment(trip.startDate).calendar()} -{" "}
              {moment(trip.endDate).calendar()}
            </Typography>
          </Box>

          <CardOverflow
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "10px 5px 5px",
            }}
          >
            <Grid container>
              <Grid xs={6}>
                <Typography level="body3" sx={{ fontSize: "sm" }}>
                  {trip.attendeesCount} attendee(-s)
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography
                  level="body3"
                  sx={{ fontSize: "sm", textAlign: "end" }}
                >
                  {trip.cities[0]}
                </Typography>
              </Grid>
            </Grid>
          </CardOverflow>
        </Stack>
      </Card>
    </Grid>
  );
};

export default React.memo(TripCard);
