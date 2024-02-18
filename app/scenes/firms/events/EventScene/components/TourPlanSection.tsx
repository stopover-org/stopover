import { graphql, useFragment } from "react-relay";
import { Grid, Stack } from "@mui/joy";
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
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Section lg={8} md={12} sm={12} xs={12}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography level="h3">{t("models.tourPlan.singular")}</Typography>
          <EditEventTourPlan eventFragmentRef={event} />
        </Stack>
      </Grid>
    </Section>
  );
};

export default React.memo(TourPlanSection);
