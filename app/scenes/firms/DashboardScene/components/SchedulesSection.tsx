import { Grid } from "@mui/joy";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Section from "../../../../components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "../../../../artifacts/SchedulesSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table";
import Link from "../../../../components/v2/Link";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../components/shared/tables/columns/schedules";
import useEdges from "../../../../lib/hooks/useEdges";

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
              bookings {
                attendees {
                  id
                }
              }
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
  const { t } = useTranslation();
  const schedules = useEdges(data.schedules) as ReadonlyArray<
    Record<string, any>
  >;
  const schedulesData = useSchedulesColumns(schedules);
  const schedulesHeaders = useSchedulesHeaders();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">{t("models.schedule.plural")}</Typography>
      </Grid>

      <Grid xs={12}>
        <Table
          data={schedulesData}
          headers={schedulesHeaders}
          aria-label="schedules table"
        />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/schedules">
          {t("general.all")} {t("models.schedule.plural")}
        </Link>
      </Grid>
    </Section>
  );
};
export default React.memo(SchedulesSection);
