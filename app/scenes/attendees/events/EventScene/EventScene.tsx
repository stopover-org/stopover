import React from "react";
import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import Breadcrumbs from "./components/Breadcrumbs";
import { EventScene_EventFragment$key } from "./__generated__/EventScene_EventFragment.graphql";
import { useBookEventForm } from "./useBookEventForm";
import EventTitle from "./components/EventTitle";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import EventActions from "./components/EventActions";

interface EventSceneProps {
  eventFragmentRef: EventScene_EventFragment$key;
}

const EventScene = ({ eventFragmentRef }: EventSceneProps) => {
  const event = useFragment(
    graphql`
      fragment EventScene_EventFragment on Event {
        ...Breadcrumbs_EventFragment
        ...EventTitle_EventFragment
        ...EventActions_EventFragment
        ...LeftColumn_EventFragment
        ...RightColumn_EventFragment
        ...useBookEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useBookEventForm(event);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()}>
        <Grid container spacing={2} padding={2}>
          <Grid xs={12}>
            <Breadcrumbs eventFragmentRef={event} />
          </Grid>
          <Grid md={9} sm={12}>
            <EventTitle eventFragmentRef={event} />
          </Grid>
          <Grid md={3} sm={12}>
            <EventActions eventFragmentRef={event} />
          </Grid>
          <Grid md={7} sm={12}>
            <LeftColumn eventFragmentRef={event} />
          </Grid>
          <Grid md={5} sm={12}>
            <RightColumn eventFragmentRef={event} />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(EventScene);
