import React from "react";
import { Grid, styled, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { EventsScene_EventsPaginationFragment$key } from "../../../../artifacts/EventsScene_EventsPaginationFragment.graphql";
import EventCardCompact from "./components/EventCardCompact";
import EventCardWide from "./components/EventCardWide";
import Pagination from "./components/Pagination";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";

interface Props {
  eventsFragmentRef: EventsScene_EventsPaginationFragment$key;
}

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
  },
}));

const EventsScene = ({ eventsFragmentRef }: Props) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("lg"));
  const isVeryLargeDisplay = useMediaQuery(theme.breakpoints.up("xl"));
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
    usePaginationFragment(
      graphql`
        fragment EventsScene_EventsPaginationFragment on Query
        @refetchable(queryName: "EventsScenePaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
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
      eventsFragmentRef
    );

  const eventsAutocomplete = useFragment(
    graphql`
      fragment EventsScene_EventsAutocompleteFragment on Query {
        ...SearchBar_EventsAutocompleteFragment
      }
    `,
    eventsFragmentRef
  );
  const events = usePagedEdges(data.events, currentPage, 10);
  const [filters, setFilters] = React.useState<any>({});
  React.useEffect(() => {
    refetch({ ...filters, after: 1 });

    setCurrentPage(1);
  }, [filters]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={2} container width="250px">
          <Sidebar
            eventFiltersFragment={data?.eventFilters}
            onChange={(args) => {
              setFilters(args);
            }}
          />
        </Grid>
      )}

      <ContentWrapper
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100wv - 250px)",
        }}
      >
        <Grid xl={9} lg={12} xs={12}>
          <SearchBar eventsAutocompleteFragmentRef={eventsAutocomplete} />
        </Grid>
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
            return <EventCardCompact key={event.id} eventFragmentRef={event} />;
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
                }
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
