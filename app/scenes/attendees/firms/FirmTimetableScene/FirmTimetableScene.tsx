import { Grid, Stack } from "@mui/joy";
import Section from "components/v2/Section/Section";
import React from "react";
import { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { FirmTimetableScene_EventsConnectionFragment$key } from "artifacts/FirmTimetableScene_EventsConnectionFragment.graphql";
import { FirmTimetableScene_FirmFragment$key } from "artifacts/FirmTimetableScene_FirmFragment.graphql";

interface FirmTimetableSceneProps {
  eventsConnectionFragmentRef: FirmTimetableScene_EventsConnectionFragment$key;
  firmFragmentRef: FirmTimetableScene_FirmFragment$key;
  date: Moment;
}

const FirmTimetableScene = ({
  eventsConnectionFragmentRef,
  firmFragmentRef,
  date,
}: FirmTimetableSceneProps) => {
  const events = useFragment(
    graphql`
      fragment FirmTimetableScene_EventsConnectionFragment on EventConnection {
        nodes {
          id
        }
      }
    `,
    eventsConnectionFragmentRef
  );

  const firm = useFragment(
    graphql`
      fragment FirmTimetableScene_FirmFragment on Firm {
        firmType
        image
        title
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Grid container padding={2} spacing={2} sm={12} md={12}>
      {firm.firmType === "onboarding" && (
        <Grid lg={12} md={12} sm={12} xs={12}>
          <Section variant="soft" color="primary" margin={0} padding={0}>
            {t(`models.firm.firmTypeExplanations.onboarding`)}
          </Section>
        </Grid>
      )}
      {firm.image && (
        <Grid lg={3} md={3} sm={12} xs={12}>
          <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
            <img width="100%" src={firm.image} alt={`${firm.title} - logo`} />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(FirmTimetableScene);
