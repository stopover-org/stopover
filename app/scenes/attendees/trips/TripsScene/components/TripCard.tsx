import React from "react";
import { AspectRatio, Box, Card, CardOverflow, Grid, Stack } from "@mui/joy";
import { graphql, useFragment, useMutation } from "react-relay";
import moment from "moment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/joy/IconButton";
import Link from "../../../../../components/v2/Link/Link";
import Typography from "../../../../../components/v2/Typography/Typography";
import { TripCard_TripFragment$key } from "../../../../../artifacts/TripCard_TripFragment.graphql";

interface TripCardProps {
  tripFragmentRef: TripCard_TripFragment$key;
}

const TripCard = ({ tripFragmentRef }: TripCardProps) => {
  const trip = useFragment(
    graphql`
      fragment TripCard_TripFragment on Trip {
        id
        startDate
        endDate
        attendeesCount
        cities
        images
        canCancel
      }
    `,
    tripFragmentRef
  );

  const [cancelTrip] = useMutation(graphql`
    mutation TripCard_CancelTripMutation($input: CancelTripInput!) {
      cancelTrip(input: $input) {
        trip {
          ...TripCard_TripFragment
          account {
            ...TripsScene_AccountFragment
          }
        }
        notification
        errors
      }
    }
  `);

  const onCancelTrip = () =>
    cancelTrip({ variables: { input: { tripId: trip.id } } });

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
          {trip.canCancel && (
            <Box>
              <IconButton
                variant="outlined"
                color="danger"
                size="sm"
                onClick={onCancelTrip}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          )}
          <Link href={`/trips/${trip.id}`}>
            <Typography
              sx={{
                fontSize: "md",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "200px",
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
