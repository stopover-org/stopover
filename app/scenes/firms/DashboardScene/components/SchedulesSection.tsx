import { Grid } from "@mui/joy";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import Section from "../../../../components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "../../../../artifacts/SchedulesSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table";
import Link from "../../../../components/v2/Link";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../components/shared/tables/columns/schedules";
import { usePagedEdges } from "../../../../lib/hooks/usePagedEdges";

interface ScheduleSectionProps {
  firmFragmentRef: SchedulesSection_FirmFragment$key;
}
const SchedulesSection = ({ firmFragmentRef }: ScheduleSectionProps) => {
  const { data } = usePaginationFragment(
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
                id
                title
              }
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  const schedules = usePagedEdges(data.schedules, 1, 10);
  const schedulesData = useSchedulesColumns(schedules as Record<string, any>[]);
  const schedulesHeaders = useSchedulesHeaders();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Schedules</Typography>
      </Grid>

      <Grid xs={12}>
        <Table
          data={schedulesData}
          headers={schedulesHeaders}
          aria-label="schedules table"
        />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/schedules">All Schedules</Link>
      </Grid>
    </Section>
  );
};
export default React.memo(SchedulesSection);
