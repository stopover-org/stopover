import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/joy";
import Link from "../../../../components/v2/Link/Link";
import { EventsSection_FirmFragment$key } from "../../../../artifacts/EventsSection_FirmFragment.graphql";
import Section from "../../../../components/v2/Section/Section";
import Typography from "../../../../components/v2/Typography/Typography";
import EventsTable from "../../../../components/shared/tables/EventsTable";

interface EventsSectionProps {
  firmFragmentRef: EventsSection_FirmFragment$key;
}

const EventsSection = ({ firmFragmentRef }: EventsSectionProps) => {
  const firm = useFragment(
    graphql`
      fragment EventsSection_FirmFragment on Firm {
        ...EventsTable_FirmFragment
      }
    `,
    firmFragmentRef
  );
  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Events</Typography>
      </Grid>
      <Grid xs={12}>
        <EventsTable firmFragmentRef={firm} />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/events">All Events</Link>
      </Grid>
    </Section>
  );
};

export default React.memo(EventsSection);
