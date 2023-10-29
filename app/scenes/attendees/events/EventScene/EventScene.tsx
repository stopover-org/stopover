import React from "react";
import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import Breadcrumbs from "./components/Breadcrumbs";
import { useBookEventForm } from "./useBookEventForm";
import EventTitle from "./components/EventTitle";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import { EventScene_EventFragment$key } from "../../../../artifacts/EventScene_EventFragment.graphql";

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
        images
      }
    `,
    eventFragmentRef
  );
  const form = useBookEventForm(event);
  const showLeftColumn = React.useMemo(() => event?.images?.length > 0, [event])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()}>
        <Grid container spacing={{ md: 2, sm: 1 }} padding={{ md: 2, sm: 1 }} sx={{maxWidth: showLeftColumn ? 'unset' : '1440px', margin: showLeftColumn ? 'unset' : '0 auto'}}>
          <Grid xs={12}>
            <Breadcrumbs eventFragmentRef={event} />
          </Grid>
          <Grid md={12} sm={12}>
            <EventTitle eventFragmentRef={event} />
          </Grid>
          {showLeftColumn && <Grid md={7} sm={12}>
            <LeftColumn eventFragmentRef={event} />
          </Grid>}
          <Grid md={showLeftColumn ? 5 : 12} sm={12}>
            <RightColumn eventFragmentRef={event} />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(EventScene);
