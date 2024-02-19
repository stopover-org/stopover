import { graphql, useFragment, usePaginationFragment } from "react-relay";
import React from "react";
import { Divider, Grid } from "@mui/joy";
import { FirmScene_CurrentFirmFragment$key } from "artifacts/FirmScene_CurrentFirmFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import Description from "components/v2/Description/Description";
import { usePagedEdges } from "lib/hooks/usePagedEdges";
import Pagination from "scenes/attendees/events/EventsScene/components/Pagination";
import EventCardCompact from "scenes/attendees/events/EventsScene/components/EventCardCompact";
import { FirmScenePaginationQuery } from "artifacts/FirmScenePaginationQuery.graphql";
import { FirmScene_EventPaginationFragment$key } from "artifacts/FirmScene_EventPaginationFragment.graphql";
import { useTranslation } from "react-i18next";
import GoogleMap from "components/shared/GoogleMap/GoogleMap";
import Link from "components/v2/Link";

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

  return (
    <Grid container padding={2} spacing={2} sm={12} md={12}>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Typography level="h3">{firm.title}</Typography>
        <Typography>{firm.address?.fullAddress}</Typography>
        {firm.website && (
          <Link href={firm.website} target="_blank">
            Website
          </Link>
        )}
      </Grid>
      <Grid lg={3} md={3} sm={12} xs={12}>
        {firm.image && (
          <img width="100%" src={firm.image} alt={`${firm.title}-logo`} />
        )}
      </Grid>
      <Grid lg={6} md={9} sm={12} xs={12}>
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
      </Grid>
      <Grid container padding={2} spacing={2} sm={12} md={12}>
        <Typography level="h3">{t("models.event.plural")}</Typography>
      </Grid>
      <Grid lg={9} md={12} sm={12} xs={12} container>
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
    </Grid>
  );
};

export default React.memo(FirmScene);
