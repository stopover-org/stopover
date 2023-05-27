import React from "react";
import { Grid, styled, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { graphql, usePaginationFragment } from "react-relay";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { EventsScene_EventsPaginationFragment$key } from "./__generated__/EventsScene_EventsPaginationFragment.graphql";
import EventCardCompact from "./components/EventCardCompact";
import useEdges from "../../../../lib/hooks/useEdges";
import EventCardWide from "./components/EventCardWide";
import Pagination from "./components/Pagination";

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
  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment(
      graphql`
        fragment EventsScene_EventsPaginationFragment on Query
        @refetchable(queryName: "EventsScenePaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          schedules(first: $count, after: $cursor)
            @connection(key: "EventsScene_query_schedules") {
            edges {
              node {
                id
                ...EventCardCompacts_ScheduleFragment
                ...EventCardWide_ScheduleFragment
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

  const schedules = useEdges(data.schedules).slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={2} container width="250px">
          <Sidebar eventFiltersFragment={data?.eventFilters} />
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
          <SearchBar />
        </Grid>
        <Grid xl={9} lg={12} xs={12} container>
          {schedules.map((schedule, index) => {
            if (index === 0) {
              if (isVeryLargeDisplay || isLargeDisplay) {
                return (
                  <Grid key={schedule.id} xs={12} lg={12} xl={12} padding={0}>
                    <EventCardWide scheduleReference={schedule} />
                  </Grid>
                );
              }
            }
            return (
              <EventCardCompact
                key={schedule.id}
                scheduleReference={schedule}
              />
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
