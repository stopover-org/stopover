import { Grid, Stack } from "@mui/joy";
import React from "react";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Description from "components/v2/Description/Description";
import Typography from "components/v2/Typography/Typography";
import Timetable from "components/shared/Timetable";
import { InterestTimetableScene_InterestFragment$key } from "artifacts/InterestTimetableScene_InterestFragment.graphql";
import { InterestTimetableScene_EventsConnectionFragment$key } from "artifacts/InterestTimetableScene_EventsConnectionFragment.graphql";

interface FirmTimetableSceneProps {
  interestFragmentRef: InterestTimetableScene_InterestFragment$key;
  eventsConnectionFragmentRef: InterestTimetableScene_EventsConnectionFragment$key;
  date: Moment;
}

const InterestTimetableScene = ({
  interestFragmentRef,
  eventsConnectionFragmentRef,
  date,
}: FirmTimetableSceneProps) => {
  const interest = useFragment(
    graphql`
      fragment InterestTimetableScene_InterestFragment on Interest {
        title
        description
        preview
      }
    `,
    interestFragmentRef
  );

  const events = useFragment(
    graphql`
      fragment InterestTimetableScene_EventsConnectionFragment on EventConnection {
        ...Timetable_EventsConnectionFragment
      }
    `,
    eventsConnectionFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Grid container padding={2} spacing={2} sm={12} md={12}>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Typography component="h1" level="h2">
          {interest.title}
        </Typography>
        <Typography component="h2" level="h2">
          {t("models.schedule.plural")} - {moment(date).calendar("day")}
        </Typography>
      </Grid>
      <Grid lg={3} md={3} sm={12} xs={12}>
        <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
          {interest.preview && (
            <img
              width="100%"
              src={interest.preview}
              alt={`${interest.title} - preview`}
            />
          )}
          {interest.description && <Description html={interest.description} />}
        </Stack>
      </Grid>
      <Grid lg={9} md={9} sm={12} xs={12}>
        <Timetable eventsConnectionFragmentRef={events} timetableDate={date} />
      </Grid>
    </Grid>
  );
};

export default React.memo(InterestTimetableScene);
