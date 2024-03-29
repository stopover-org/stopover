import { graphql, useFragment, usePaginationFragment } from "react-relay";
import React from "react";
import { Box, Divider, Grid, Stack } from "@mui/joy";
import { FirmScene_CurrentFirmFragment$key } from "artifacts/FirmScene_CurrentFirmFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import { usePagedEdges } from "lib/hooks/usePagedEdges";
import { FirmScenePaginationQuery } from "artifacts/FirmScenePaginationQuery.graphql";
import { FirmScene_EventPaginationFragment$key } from "artifacts/FirmScene_EventPaginationFragment.graphql";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link";
import Description from "components/v2/Description";
import GoogleMap from "components/shared/GoogleMap";
import EventCardCompact from "scenes/attendees/events/EventsScene/components/EventCardCompact";
import Pagination from "scenes/attendees/events/EventsScene/components/Pagination";
import Section from "components/v2/Section/Section";
import moment from "moment";
import { urlSafeDateFormat } from "lib/utils/dates";

interface Props {
  firmFragmentRef: FirmScene_CurrentFirmFragment$key;
}

export const FirmScene = ({ firmFragmentRef }: Props) => {
  const firm = useFragment<FirmScene_CurrentFirmFragment$key>(
    graphql`
      fragment FirmScene_CurrentFirmFragment on Firm {
        id
        title
        description
        image
        website
        primaryEmail
        primaryPhone
        firmType
        address {
          fullAddress
          country
          region
          city
          street
          houseNumber
          latitude
          longitude
        }
        ...FirmScene_EventPaginationFragment
      }
    `,
    firmFragmentRef
  );

  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment<
      FirmScenePaginationQuery,
      FirmScene_EventPaginationFragment$key
    >(
      graphql`
        fragment FirmScene_EventPaginationFragment on Firm
        @refetchable(queryName: "FirmScenePaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 12 }
          cursor: { type: "String", defaultValue: "0" }
        ) {
          events(first: $count, after: $cursor, backend: false)
            @connection(key: "FirmScene_query_events") {
            edges {
              node {
                id
                ...EventCardCompacts_EventFragment
              }
            }
          }
        }
      `,
      firm
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const events = usePagedEdges(data.events, currentPage, 12);
  const { t } = useTranslation();
  const isStopover = React.useMemo(
    () => firm.title.toLowerCase() === "stopoverx",
    [firm]
  );

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
        <Typography level="h3">{firm.title}</Typography>
        <Typography>{firm.address?.fullAddress}</Typography>
        {firm.website && (
          <Link href={firm.website} target="_blank">
            Website
          </Link>
        )}
        <br />
        {firm.primaryEmail && (
          <Link href={`mailto:${firm.primaryEmail}`}>E-Mail</Link>
        )}
        <br />
        {firm.primaryPhone && <Typography>{firm.primaryPhone}</Typography>}
      </Grid>
      {firm.image && (
        <Grid lg={3} md={3} sm={12} xs={12}>
          <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
            <img width="100%" src={firm.image} alt={`${firm.title} - logo`} />
          </Stack>
        </Grid>
      )}
      <Grid lg={firm.image ? 6 : 9} md={9} sm={12} xs={12}>
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
        <Stack spacing={2} useFlexGap>
          <Box pt={2}>
            <Link href={`/timetables/firms/${firm.id}`} primary>
              {t("scenes.attendees.timetables.firmTimetableScene.title", {
                date: t("dates.today"),
              })}
            </Link>
          </Box>
          <Box>
            <Link
              href={`/timetables/firms/${firm.id}/${moment()
                .add(1, "days")
                .format(urlSafeDateFormat)}`}
              primary
            >
              {t("scenes.attendees.timetables.firmTimetableScene.title", {
                date: t("dates.tomorrow"),
              })}
            </Link>
          </Box>
        </Stack>
      </Grid>
      {!isStopover && (
        <>
          <Grid container padding={2} spacing={2} sm={12} md={12}>
            <Typography level="h3">{t("models.event.plural")}</Typography>
          </Grid>
          <Grid lg={9} md={12} sm={12} xs={12} container spacing={2}>
            {events.map((event) => (
              <EventCardCompact
                key={event!.id}
                eventFragmentRef={event!}
                includeInterests={false}
              />
            ))}
          </Grid>
          <Grid xs={12}>
            <Pagination
              showPrev={hasPrevious}
              showNext={hasNext}
              onPrev={() => {
                if (hasPrevious) {
                  loadPrevious(12, {
                    onComplete: () => setCurrentPage(currentPage - 1),
                  });
                  return;
                }
                setCurrentPage(currentPage - 1);
              }}
              onNext={() => {
                if (hasNext) {
                  loadNext(12, {
                    onComplete: () => setCurrentPage(currentPage + 1),
                  });
                  return;
                }
                setCurrentPage(currentPage + 1);
              }}
              currentPage={currentPage}
              perPage={12}
              total={data.events.edges.length}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default React.memo(FirmScene);
