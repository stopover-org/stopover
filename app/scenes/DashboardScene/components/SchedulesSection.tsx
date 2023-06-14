import { Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "./__generated__/SchedulesSection_FirmFragment.graphql";
import Typography from "../../../components/v2/Typography/Typography";
import Table from "../../../components/v2/Table";

interface ScheduleSectionProps {
  firmFragmentRef: SchedulesSection_FirmFragment$key;
}
const SchedulesSection = ({ firmFragmentRef }: ScheduleSectionProps) => {
  const { data } = useFragment(
    graphql`
      fragment SchedulesSection_FirmFragment on Firm
      @refetchable(queryName: "SchedulesSectionFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        schedules(first: $count, after: $cursor)
          @connection(key: "DashboardScene_query_schedules") {
          edges {
            node {
              scheduledFor
              status
              event {
                title
              }
            }
          }
        }
      }
    `,
    firmFragmentRef
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Schedules</Typography>
      </Grid>
      <Grid xs={12}>
        <Table
          data={[]}
          headers={[
            {
              label: "",
              key: "date",
            },
          ]}
        />
      </Grid>
    </Section>
  );
};
export default React.memo(SchedulesSection);
