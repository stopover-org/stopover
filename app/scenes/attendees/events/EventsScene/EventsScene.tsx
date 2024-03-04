import React from "react";
import { Chip, ChipDelete, Grid, Stack, styled, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import {
  Disposable,
  graphql,
  useFragment,
  usePaginationFragment,
} from "react-relay";
import { EventsScene_EventsPaginationFragment$key } from "artifacts/EventsScene_EventsPaginationFragment.graphql";
import { usePagedEdges } from "lib/hooks/usePagedEdges";
import { EventsScenePaginationQuery } from "artifacts/EventsScenePaginationQuery.graphql";
import { EventsScene_InterestsFragment$key } from "artifacts/EventsScene_InterestsFragment.graphql";
import { GlobalSidebarContext } from "components/GlobalSidebarProvider";
import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import moment, { Moment } from "moment";
import Pagination from "./components/Pagination";
import EventCardWide from "./components/EventCardWide";
import EventCardCompact from "./components/EventCardCompact";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

interface Props {
  eventsFragmentRef:
    | EventsScene_EventsPaginationFragment$key
    | EventsScene_InterestsFragment$key;
}

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
  },
}));

const EventsScene = ({ eventsFragmentRef }: Props) => {
  const theme = useTheme();
  const [initialRender, setInitialRender] = React.useState<boolean>(true);
  const { setContent } = React.useContext(GlobalSidebarContext);
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("lg"));
  const isVeryLargeDisplay = useMediaQuery(theme.breakpoints.up("xl"));
  const [currentPage, updateCurrentPage] = React.useState<number>(1);
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
            startDate
            endDate
            minPrice {
              cents
            }
            maxPrice {
              cents
            }
          }
        }
      `,
      eventsFragmentRef as EventsScene_EventsPaginationFragment$key
    );

  const interestsQuery = useFragment<EventsScene_InterestsFragment$key>(
    graphql`
      fragment EventsScene_InterestsFragment on Query {
        ...Sidebar_InterestsFragment
      }
    `,
    eventsFragmentRef as EventsScene_InterestsFragment$key
  );
  const query = useQuery("query", "");
  const maxPrice = useQuery(
    "maxPrice",
    data.eventFilters.maxPrice.cents / 100,
    (value) => parseInt(value, 10)
  );

  const minPrice = useQuery(
    "minPrice",
    data.eventFilters.minPrice.cents / 100,
    (value) => parseInt(value, 10)
  );

  const interests = useQuery("interests", [], (value) =>
    Array.from(parseValue(value))
  );
  const updateInterests = useUpdateQuery("interests");
  const dates = useQuery("dates", [], (dts) =>
    parseValue(dts)
      .map((dt: string) => moment(dt))
      .filter((dt: Moment) => dt.isValid)
  );
  const startDate = dates[0]?.toISOString();
  const endDate = dates[1]?.toISOString();
  const events = usePagedEdges(data.events, currentPage, 10);
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          interests,
          query,
          startDate,
          endDate,
          minPrice,
          maxPrice,
        },
        cursor: "0",
      },
      {
        onComplete: () => {
          if (currentPage !== 1) {
            updateCurrentPage(1);
          }
        },
      }
    );
  }, [query, startDate, endDate, minPrice, maxPrice, interests]);

  React.useEffect(() => {
    setContent(
      <Sidebar
        eventFiltersFragment={data?.eventFilters}
        interestsQueryFragmentRef={interestsQuery}
        sidebar
      />
    );
  }, [data, interestsQuery]);

  return (
    <Grid container>
      {showSidebar && (
        <Grid xs={2} container width="240px">
          <Sidebar
            eventFiltersFragment={data?.eventFilters}
            interestsQueryFragmentRef={interestsQuery}
          />
        </Grid>
      )}

      <ContentWrapper
        lg={10}
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "10px",
          flexDirection: "column",
        }}
      >
        <Grid xl={9} lg={12} xs={12} paddingRight={2}>
          <SearchBar />
        </Grid>
        {interests.length > 0 && (
          <Grid xl={9} lg={12} xs={12} p={1}>
            <Stack direction="row" useFlexGap>
              {interests.map((interest: string) =>
                interest ? (
                  <Chip
                    key={interest}
                    size="lg"
                    variant="outlined"
                    endDecorator={
                      <ChipDelete
                        onDelete={() => {
                          updateInterests(
                            interests.filter(
                              (slug: string) => slug !== interest
                            )
                          );
                        }}
                      />
                    }
                  >
                    {interest}
                  </Chip>
                ) : null
              )}
            </Stack>
          </Grid>
        )}
        <Grid xl={9} lg={12} xs={12} container rowSpacing={1} gap={1} pt="20px">
          {events.map((event, index) => {
            if (index === 0) {
              if (isVeryLargeDisplay || isLargeDisplay) {
                return (
                  <Grid key={event!.id} xs={12} lg={12} xl={12}>
                    <EventCardWide eventFragmentRef={event!} />
                  </Grid>
                );
              }
            }
            return (
              <EventCardCompact key={event!.id} eventFragmentRef={event!} />
            );
          })}
          <Grid xs={12}>
            <Pagination
              showPrev={hasPrevious}
              showNext={hasNext}
              onPrev={() => {
                if (hasPrevious) {
                  loadPrevious(10, {
                    onComplete: () => updateCurrentPage(currentPage - 1),
                  });
                  return;
                }
                updateCurrentPage(currentPage - 1);
              }}
              onNext={() => {
                if (hasNext) {
                  loadNext(10, {
                    onComplete: () => updateCurrentPage(currentPage + 1),
                  });
                  return;
                }
                updateCurrentPage(currentPage + 1);
              }}
              currentPage={currentPage}
              perPage={10}
              total={data.events.edges.length}
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(EventsScene);
