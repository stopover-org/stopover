import { graphql, useFragment } from "react-relay";
import { Box, Grid, Stack } from "@mui/joy";
import React from "react";
import Typography from "components/v2/Typography/Typography";
import { useTranslation } from "react-i18next";
import Section from "components/v2/Section";
import { TourPlanSection_EventFragment$key } from "artifacts/TourPlanSection_EventFragment.graphql";
import EditEventTourPlan from "components/shared/forms/tourPlan/EditEventTourPlan";

interface TourPlanSectionProps {
  eventFragmentRef: TourPlanSection_EventFragment$key;
}

const TourPlanSection = ({ eventFragmentRef }: TourPlanSectionProps) => {
  const event = useFragment<TourPlanSection_EventFragment$key>(
    graphql`
      fragment TourPlanSection_EventFragment on Event {
        ...EditEventTourPlan_EventFragment
        tourPlan {
          title
          description
          tourPlaces {
            id
            title
            description
            durationTime
          }
        }
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Section lg={8} md={12} sm={12} xs={12} spacing={2}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography level="h3">{t("models.tourPlan.singular")}</Typography>
          <EditEventTourPlan eventFragmentRef={event} />
        </Stack>
      </Grid>
      {event.tourPlan && (
        <>
          <Grid xs={12}>
            <Typography level="h4">{event.tourPlan.title}</Typography>
            <Typography>{event.tourPlan.description}</Typography>
          </Grid>
          {event.tourPlan?.tourPlaces?.map((place, index) => (
            <React.Fragment key={place.id}>
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
                      <Typography component="span" sx={{ fontStyle: "italic" }}>
                        ({place.durationTime})
                      </Typography>
                    )}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} marginBottom={2}>
                <Typography sx={{ marginLeft: "40px" }}>
                  {place.description}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </>
      )}
    </Section>
  );
};

export default React.memo(TourPlanSection);
