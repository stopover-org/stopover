import { graphql, useFragment } from "react-relay";
import { Box, Divider, Grid, Stack } from "@mui/joy";
import React from "react";
import { RightColumn_EventFragment$key } from "artifacts/RightColumn_EventFragment.graphql";
import Description from "components/v2/Description";
import Typography from "components/v2/Typography";
import { useTranslation } from "react-i18next";
import GoogleMap from "components/shared/GoogleMap";
import BookEvent from "./BookEvent";

interface RightColumnProps {
  eventFragmentRef: RightColumn_EventFragment$key;
}

const RightColumn = ({ eventFragmentRef }: RightColumnProps) => {
  const event = useFragment<RightColumn_EventFragment$key>(
    graphql`
      fragment RightColumn_EventFragment on Event {
        title
        description
        address {
          fullAddress
          latitude
          longitude
          country
          city
        }
        tourPlan {
          title
          description
          tourPlaces {
            title
            description
            durationTime
          }
        }
        ...BookEvent_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  return (
    <Stack
      sx={{ position: "sticky", top: "0", right: "0" }}
      spacing={2}
      useFlexGap
    >
      <Box width="100%">
        <Description html={event.description} />
      </Box>
      <Box width="100%">
        {event.tourPlan && (
          <>
            <Grid xs={12}>
              <Typography level="h4">{event.tourPlan.title}</Typography>
              <Typography>{event.tourPlan.description}</Typography>
            </Grid>
            {event.tourPlan?.tourPlaces?.map((place, index) => (
              <>
                <Grid xs={12}>
                  <Stack direction="row">
                    <Box
                      sx={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        minWidth: "30px",
                        minHeight: "30px",
                        lineHeight: "30px",
                        backgroundColor:
                          "var(--joy-palette-primary-500, #D3232F)",
                        color: "white",
                        fontSize: "20px",
                        fontStyle: "bold",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography fontSize="lg" sx={{ marginLeft: "10px" }}>
                      {place.title}{" "}
                      {place.durationTime && (
                        <Typography sx={{ fontStyle: "italic" }}>
                          ({place.durationTime})
                        </Typography>
                      )}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid xs={12} marginBottom={1}>
                  <Typography sx={{ marginLeft: "40px" }}>
                    {place.description}
                  </Typography>
                </Grid>
              </>
            ))}
          </>
        )}
      </Box>
      <Box width="100%">
        {event.address && (
          <>
            <Divider sx={{ margin: 2 }} />
            <Typography level="h4">
              {t("scenes.attendees.events.eventScene.meetPoint")}
            </Typography>
            <Typography fontSize="lg-title">
              {event.address?.fullAddress}
            </Typography>
            <Typography fontSize="lg-title">
              {event.address?.country}, {event.address?.city}
            </Typography>
            {event.address?.latitude && event.address?.longitude && (
              <>
                <Divider sx={{ margin: 2 }} />
                <GoogleMap
                  center={{
                    lat: event.address?.latitude!,
                    lng: event.address?.longitude!,
                  }}
                  markers={[
                    {
                      lat: event.address?.latitude!,
                      lng: event.address?.longitude!,
                    },
                  ]}
                />
              </>
            )}
          </>
        )}
      </Box>
      <Box width="100%">
        <BookEvent eventFragmentRef={event} />
      </Box>
    </Stack>
  );
};

export default React.memo(RightColumn);
