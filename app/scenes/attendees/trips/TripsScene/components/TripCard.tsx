import React from "react";
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Grid,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/joy";
import { graphql, useFragment, useMutation } from "react-relay";
import moment from "moment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/joy/IconButton";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import Link from "../../../../../components/v2/Link/Link";
import Typography from "../../../../../components/v2/Typography/Typography";
import { TripCard_TripFragment$key } from "../../../../../artifacts/TripCard_TripFragment.graphql";

interface TripCardProps {
  tripFragmentRef: TripCard_TripFragment$key;
  danger?: boolean
}

const TripCard = ({ tripFragmentRef, danger }: TripCardProps) => {
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
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: isMobileView ? "unset" : "420px",
        maxHeight: isMobileView ? 'unset' : '130px',
        minHeight: isMobileView ? 'unset' : '130px',
      }}
      color={danger ? 'danger' : undefined}
    >
      {!isMobileView && (
        <CardOverflow>
          <AspectRatio
            minHeight="128px"
            maxHeight="128px"
            ratio="2"
            sx={{ width: "130px" }}
            objectFit="cover"
          >
            <img src={trip.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
      )}
      <Stack paddingLeft={isMobileView ? 0 : "10px"} width="100%" sx={{ position: "relative" }} spacing={1} useFlexGap>
        {trip.canCancel && (
          <Box>
            <Tooltip title={t("scenes.attendees.trips.tripsScene.cancelTrip")}>
              <IconButton
                variant="outlined"
                color="danger"
                size="sm"
                onClick={onCancelTrip}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Link href={`/trips/${trip.id}`}>
          <Tooltip title={`${trip.cities.join(", ")}`}>
            <Typography
              sx={{
                fontSize: "md",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
                overflow: "hidden",
                maxWidth: '150px'
              }}
            >
              {trip.cities.join(", ")}
            </Typography>
          </Tooltip>
        </Link>
        <Box>
          <Tooltip title={`${moment(trip.startDate).calendar()} - ${moment(trip.endDate).calendar()}`}>
            <Typography level="body-md" sx={{ 
              fontSize: "sm",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-block",
              overflow: "hidden",
              maxWidth: '230px'
            }}>
              {moment(trip.startDate).calendar()} -{" "}
              {moment(trip.endDate).calendar()}
            </Typography>
          </Tooltip>
        </Box>
        <Box>
          <Stack direction='row' justifyContent={'space-between'}>
            <Typography level="body-sm">
              {t("scenes.attendees.trips.tripScene.attendeesCount", {
                count: trip.attendeesCount,
              })}
            </Typography>
            <Typography level="body-sm" sx={{ textAlign: "end" }}>
              {trip.cities[0]}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default React.memo(TripCard);
