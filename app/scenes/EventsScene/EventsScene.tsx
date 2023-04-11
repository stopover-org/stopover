import React from "react";
import { Grid, useTheme } from "@mui/joy";
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
        events(first: $count, after: $cursor)
          @connection(key: "EventsScene_query_events") {
          edges {
            node {
              id
              ...EventCardCompacts_EventFragment
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
  const events = useEdges(data.events);

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={2} container sx={{ maxWidth: "250px", minWidth: "250px" }}>
          <Sidebar eventFiltersFragment={data?.eventFilters} />
        </Grid>
      )}

      <Grid
        md={9}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100vw - 250px)",
        }}
      >
        <Grid md={9} sm={12}>
          <SearchBar />
        </Grid>
        <Grid md={9} sm={12} container>
          {events.map((event) => (
            <EventCardCompact key={event.id} eventReference={event} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
