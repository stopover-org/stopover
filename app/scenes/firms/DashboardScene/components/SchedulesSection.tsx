import { Grid } from "@mui/joy";
import React, { useMemo } from "react";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import moment from "moment/moment";
import Section from "../../../../components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "./__generated__/SchedulesSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table";
import useEdges from "../../../../lib/hooks/useEdges";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import Link from "../../../../components/v2/Link";

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
  const schedules = useEdges(data.schedules);
  const actualSchedules = useMemo(
    () =>
      schedules.map((schedule) => ({
        event: (
          <Link primary href={`/my-firm/events/${schedule.event.id}`}>
            {schedule.event.title}
          </Link>
        ),
        date: getHumanDateTime(moment(schedule.scheduledFor)),
      })),
    [schedules]
  );

  const headers = useMemo(
    () => [
      {
        label: "Event",
        key: "event",
      },
      {
        label: "Date",
        key: "date",
      },
    ],
    []
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Schedules</Typography>
      </Grid>

      <Grid xs={12}>
        <Table
          data={actualSchedules}
          headers={headers}
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
