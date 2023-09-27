import React from "react";
import { Chip, ChipDelete, Grid, styled, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { useRouter } from "next/router";
import { stringify } from "qs";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { EventsScene_EventsPaginationFragment$key } from "../../../../artifacts/EventsScene_EventsPaginationFragment.graphql";
import EventCardCompact from "./components/EventCardCompact";
import EventCardWide from "./components/EventCardWide";
import Pagination from "./components/Pagination";
import { EventsScene_EventsAutocompleteFragment$key } from "../../../../artifacts/EventsScene_EventsAutocompleteFragment.graphql";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { EventsScenePaginationQuery } from "../../../../artifacts/EventsScenePaginationQuery.graphql";
import { EventsScene_InterestsFragment$key } from "../../../../artifacts/EventsScene_InterestsFragment.graphql";

interface Props {
  eventsFragmentRef:
    | EventsScene_EventsPaginationFragment$key
    | EventsScene_EventsAutocompleteFragment$key
    | EventsScene_InterestsFragment$key;
}

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
  },
}));

const EventsScene = ({ eventsFragmentRef }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("lg"));
  const isVeryLargeDisplay = useMediaQuery(theme.breakpoints.up("xl"));
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
    usePaginationFragment<
      EventsScenePaginationQuery,
      EventsScene_EventsPaginationFragment$key
    >(
      graphql`
        fragment EventsScene_EventsPaginationFragment on Query
        @refetchable(queryName: "EventsScenePaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "0" }
          filters: { type: "EventsFilter", defaultValue: {} }
        ) {
          events(first: $count, after: $cursor, filters: $filters)
            @connection(key: "EventsScene_query_events") {
            edges {
              node {
                id
                ...EventCardCompacts_EventFragment
                ...EventCardWide_EventFragment
              }
            }
          }
          eventFilters {
            ...Sidebar_EventFiltersFragment
          }
        }
      `,
      eventsFragmentRef as EventsScene_EventsPaginationFragment$key
    );

  const eventsAutocompleteQuery =
    useFragment<EventsScene_EventsAutocompleteFragment$key>(
      graphql`
        fragment EventsScene_EventsAutocompleteFragment on Query {
          ...SearchBar_EventsAutocompleteFragment
        }
      `,
      eventsFragmentRef as EventsScene_EventsAutocompleteFragment$key
    );

  const interestsQuery = useFragment<EventsScene_InterestsFragment$key>(
    graphql`
      fragment EventsScene_InterestsFragment on Query {
        ...Sidebar_InterestsFragment
      }
    `,
    eventsFragmentRef as EventsScene_InterestsFragment$key
  );
  const q = { ...router.query };
  const interestsSlug = (
    Array.isArray(q["interests[]"]) ? q["interests[]"] : [q["interests[]"]]
  ).filter(Boolean) as string[];
  const { query } = router.query;
  const events = usePagedEdges(data.events, currentPage, 10);
  const [{ filters }, setFilters] = React.useState<any>({
    query,
  });

  React.useEffect(() => {
    const startDate = filters?.startDate
      ? filters?.startDate.toISOString()
      : undefined;

    const endDate = filters?.endDate
      ? filters?.endDate.toISOString()
      : undefined;

    refetch(
      {
        filters: {
          ...filters,
          interests: interestsSlug,
          startDate,
          endDate,
        },
        cursor: "0",
      },
      {
        fetchPolicy: "store-and-network",
        onComplete: () => {
          setCurrentPage(1);
        },
      }
    );
  }, [filters, router]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <React.Suspense>
          <Grid xs={2} container width="250px">
            <Sidebar
              eventFiltersFragment={data?.eventFilters}
              interestsQueryFragmentRef={interestsQuery}
              onChange={(args) => {
                setFilters(args);
              }}
            />
          </Grid>
        </React.Suspense>
      )}

      <ContentWrapper
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          flexDirection: "column",
        }}
      >
        <Grid xl={9} lg={12} xs={12}>
          <SearchBar eventsAutocompleteFragmentRef={eventsAutocompleteQuery} />
        </Grid>
        {interestsSlug.length > 0 && (
          <Grid xl={9} lg={12} xs={12}>
            {interestsSlug.map((interest) => (
              <Chip
                size="lg"
                variant="outlined"
                endDecorator={
                  <ChipDelete
                    onDelete={() => {
                      q.interests = interestsSlug.filter(
                        (slug) => slug !== interest
                      );

                      delete q["interests[]"];

                      const url = `/events?${stringify(q, {
                        arrayFormat: "brackets",
                        encode: false,
                      })}`;

                      router.push(url);
                    }}
                  />
                }
              >
                {interest}
              </Chip>
            ))}
          </Grid>
        )}
        <React.Suspense>
          <Grid xl={9} lg={12} xs={12} container>
            {events.map((event, index) => {
              if (index === 0) {
                if (isVeryLargeDisplay || isLargeDisplay) {
                  return (
                    <Grid key={event.id} xs={12} lg={12} xl={12} padding={0}>
                      <EventCardWide eventFragmentRef={event} />
                    </Grid>
                  );
                }
              }
              return (
                <EventCardCompact key={event.id} eventFragmentRef={event} />
              );
            })}
            <Grid xs={12}>
              <Pagination
                showPrev={hasPrevious}
                showNext={hasNext}
                onPrev={() => {
                  if (hasPrevious) {
                    loadPrevious(10, {
                      onComplete: () => setCurrentPage(currentPage - 1),
                    });
                    return;
                  }
                  setCurrentPage(currentPage - 1);
                }}
                onNext={() => {
                  if (hasNext) {
                    loadNext(10, {
                      onComplete: () => setCurrentPage(currentPage + 1),
                    });
                    return;
                  }
                  setCurrentPage(currentPage + 1);
                }}
                currentPage={currentPage}
              />
            </Grid>
          </Grid>
        </React.Suspense>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(EventsScene);
