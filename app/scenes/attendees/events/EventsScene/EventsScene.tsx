import React from "react";
import { Chip, ChipDelete, Grid, Stack, styled, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import {
  Disposable,
  graphql,
  useFragment,
  usePaginationFragment,
} from "react-relay";
import { useRouter } from "next/router";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { EventsScene_EventsPaginationFragment$key } from "../../../../artifacts/EventsScene_EventsPaginationFragment.graphql";
import EventCardCompact from "./components/EventCardCompact";
import EventCardWide from "./components/EventCardWide";
import Pagination from "./components/Pagination";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";
import { EventsScenePaginationQuery } from "../../../../artifacts/EventsScenePaginationQuery.graphql";
import { EventsScene_InterestsFragment$key } from "../../../../artifacts/EventsScene_InterestsFragment.graphql";
import { GlobalSidebarContext } from "../../../../components/GlobalSidebarProvider";
import { useQuery, useUpdateQuery } from "../../../../lib/hooks/useQuery";

interface Props {
  eventsFragmentRef:
    | EventsScene_EventsPaginationFragment$key
    | EventsScene_InterestsFragment$key;
}

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 270px)",
  },
}));

const EventsScene = ({ eventsFragmentRef }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const { setContent } = React.useContext(GlobalSidebarContext);
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("lg"));
  const isVeryLargeDisplay = useMediaQuery(theme.breakpoints.up("xl"));
  const currentPage = useQuery('currentPage', 1)
  const updateCurrentPage = useUpdateQuery('currentPage', 1)
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

  const interestsQuery = useFragment<EventsScene_InterestsFragment$key>(
    graphql`
      fragment EventsScene_InterestsFragment on Query {
        ...Sidebar_InterestsFragment
      }
    `,
    eventsFragmentRef as EventsScene_InterestsFragment$key
  );
  const query = useQuery('query', '')
  const interestsSlug = useQuery('interests', [])
  const updateInterests = useUpdateQuery('interests', )
  const events = usePagedEdges(data.events, currentPage, 10);
  const [{ filters }, setFilters] = React.useState<any>({
    query,
  });
  
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    const startDate = filters?.startDate
      ? filters?.startDate.toISOString()
      : undefined;

    const endDate = filters?.endDate
      ? filters?.endDate.toISOString()
      : undefined;

    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
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
        onComplete: () => {
          if (currentPage !== 1) {
            updateCurrentPage(1);
          }
        },
      }
    );
  }, [filters, interestsSlug]);

  React.useEffect(() => {
    setContent(
      <Sidebar
        eventFiltersFragment={data?.eventFilters}
        interestsQueryFragmentRef={interestsQuery}
        onChange={(args) => {
          setFilters(args);
        }}
      />
    );
  }, [data, interestsQuery, filters, setFilters]);

  return (
    <Grid container>
      {showSidebar && (
        <Grid xs={2} container width="250px" padding="10px">
          <Sidebar
            eventFiltersFragment={data?.eventFilters}
            interestsQueryFragmentRef={interestsQuery}
            onChange={(args) => {
              setFilters(args);
            }}
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
          paddingLeft: showSidebar ? "60px" : "0",
          flexDirection: "column",
        }}
      >
        <Grid xl={9} lg={12} xs={12}>
          <SearchBar />
        </Grid>
        {interestsSlug.length > 0 && (
          <Grid xl={9} lg={12} xs={12} p={1}>
            <Stack direction="row" useFlexGap spacing={2}>
              {interestsSlug.map((interest: string) => (
                <Chip
                  key={interest}
                  size="lg"
                  variant="outlined"
                  endDecorator={
                    <ChipDelete
                      onDelete={() => {
                        updateInterests(interestsSlug.filter(
                          (slug: string) => slug !== interest
                        ))
                      }}
                    />
                  }
                >
                  {interest}
                </Chip>
              ))}
            </Stack>
          </Grid>
        )}
        <Grid xl={9} lg={12} xs={12} container spacing={2}>
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
            return <EventCardCompact key={event.id} eventFragmentRef={event} />;
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
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(EventsScene);
