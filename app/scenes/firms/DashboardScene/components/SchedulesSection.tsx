import { Grid } from "@mui/joy";
import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Section from "components/v2/Section";
import { SchedulesSection_FirmFragment$key } from "artifacts/SchedulesSection_FirmFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import Table from "components/v2/Table";
import Link from "components/v2/Link";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "components/shared/tables/columns/schedules";
import moment from "moment";
import { dateFormat } from "lib/utils/dates";

interface ScheduleSectionProps {
  firmFragmentRef: SchedulesSection_FirmFragment$key;
}

const SchedulesSection = ({ firmFragmentRef }: ScheduleSectionProps) => {
  const { data, refetch } = usePaginationFragment(
    graphql`
      fragment SchedulesSection_FirmFragment on Firm
      @refetchable(queryName: "SchedulesSectionFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        schedules(first: $count, after: $cursor, filters: $schedulesFilter)
          @connection(key: "DashboardScene_query_schedules") {
          ...schedules_useSchedulesColumns_SchedulesConnectionFragment
          edges {
            node {
              __typename
              id
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();
  const schedulesData = useSchedulesColumns(data.schedules!);
  const schedulesHeaders = useSchedulesHeaders();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">
          {t("models.schedule.plural")} - {moment().format(dateFormat)}
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Table
          data={schedulesData.slice(0, 5)}
          headers={schedulesHeaders}
          aria-label="schedules table"
        />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/schedules" fontSize="sm">
          {t("general.all")} {t("models.schedule.plural")}
        </Link>
      </Grid>
    </Section>
  );
};
export default React.memo(SchedulesSection);
