import React from "react";
import {Grid, styled, useTheme} from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { graphql, usePaginationFragment } from "react-relay";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import { EventsScene_EventsPaginationFragment$key } from "./__generated__/EventsScene_EventsPaginationFragment.graphql";
import EventCardCompact from "./components/EventCardCompact";
import { useEdges } from "../../lib/utils/connections";

interface Props {
  eventsFragmentRef: EventsScene_EventsPaginationFragment$key;
}

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    maxWidth: 'calc(100vw - 260px)'
  }
}))

const EventsScene = ({ eventsFragmentRef }: Props) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { data } = usePaginationFragment(
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
  const schedules = useEdges(data.schedules);

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
          minWidth: "calc(100wv - 250px)"
        }}
      >
        <Grid xl={9} lg={12} xs={12}>
          <SearchBar />
        </Grid>
        <Grid xl={9} lg={12} xs={12} container>
          {schedules.map((schedule) => (
            <EventCardCompact key={schedule.id} scheduleReference={schedule} />
          ))}
        </Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(EventsScene);
