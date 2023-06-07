import { Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "./__generated__/SchedulesSection_FirmFragment.graphql";

interface ScheduleSectionProps {
  firmFragmentRef: SchedulesSection_FirmFragment$key;
}
const SchedulesSection = ({ firmFragmentRef }: ScheduleSectionProps) => {
  const schedules = useFragment(
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
      <Grid>schedules</Grid>
    </Section>
  );
};
export default React.memo(SchedulesSection);
