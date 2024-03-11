import { Divider, Grid, Stack } from "@mui/joy";
import Section from "components/v2/Section/Section";
import React from "react";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { FirmTimetableScene_FirmFragment$key } from "artifacts/FirmTimetableScene_FirmFragment.graphql";
import Description from "components/v2/Description/Description";
import Typography from "components/v2/Typography/Typography";
import GoogleMap from "components/shared/GoogleMap/GoogleMap";
import Timetable from "components/shared/Timetable";
import Link from "../../../../components/v2/Link";

interface FirmTimetableSceneProps {
  firmFragmentRef: FirmTimetableScene_FirmFragment$key;
  date: Moment;
}

const FirmTimetableScene = ({
  firmFragmentRef,
  date,
}: FirmTimetableSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment FirmTimetableScene_FirmFragment on Firm {
        id
        firmType
        image
        title
        description
        address {
          fullAddress
          country
          city
          latitude
          longitude
        }
        events(first: 999, filters: $filters) {
          ...Timetable_EventsConnectionFragment
        }
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
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Link href={`/firms/${firm.id}`} component="h1" level="h2">
          {firm.title}
        </Link>
        <Typography component="h2" level="h4">
          {t("models.schedule.plural")} - {moment(date).calendar("day")}
        </Typography>
      </Grid>
      <Grid lg={3} md={3} sm={12} xs={12}>
        <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
          {firm.image && (
            <img width="100%" src={firm.image} alt={`${firm.title} - logo`} />
          )}
          {firm.description && <Description html={firm.description} />}
          {firm.address && (
            <>
              <Divider sx={{ margin: 2 }} />
              <Typography level="h4">{t("models.address.singular")}</Typography>
              <Typography fontSize="lg-title">
                {firm.address?.fullAddress}
              </Typography>
              <Typography fontSize="lg-title">
                {firm.address?.country}, {firm.address?.city}
              </Typography>
              {firm.address?.latitude && firm.address?.longitude && (
                <>
                  <Divider sx={{ margin: 2 }} />
                  <GoogleMap
                    center={{
                      lat: firm.address?.latitude!,
                      lng: firm.address?.longitude!,
                    }}
                    markers={[
                      {
                        lat: firm.address?.latitude!,
                        lng: firm.address?.longitude!,
                      },
                    ]}
                  />
                </>
              )}
            </>
          )}
        </Stack>
      </Grid>
      <Grid lg={9} md={9} sm={12} xs={12}>
        <Timetable
          eventsConnectionFragmentRef={firm.events}
          timetableDate={date}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(FirmTimetableScene);
