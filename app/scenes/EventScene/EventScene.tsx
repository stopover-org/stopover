import React from "react";
import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { Breadcrumbs2 } from "./components/Breadcrumbs";
import { EventScene_EventFragment$key } from "./__generated__/EventScene_EventFragment.graphql";
import EventTitle from "./components/EventTitle";
import EventActions from "./components/EventActions";
import RightColumn from "./components/RightColumn";

interface EventScheneProps {
  eventFragmentRef: EventScene_EventFragment$key;
}

const EventScene = ({ eventFragmentRef }: EventScheneProps) => {
  const event = useFragment(
    graphql`
      fragment EventScene_EventFragment on Event {
        ...Breadcrumbs_EventFragment
        ...EventTitle_EventFragment
        ...EventActions_EventFragment
        ...RightColumn_EventFragment
      }
    `,
    eventFragmentRef
  );
  return (
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Breadcrumbs2 eventFragmentRef={event} />
      </Grid>
      <Grid xs={9}>
        <EventTitle eventFragmentRef={event} />
      </Grid>
      <Grid xs={3}>
        <EventActions eventFragmentRef={event} />
      </Grid>
      <Grid xs={8}>
        <RightColumn eventFragmentRef={event} />
      </Grid>
    </Grid>
  );
};

export default React.memo(EventScene);
