import React from "react";
import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { BookingsSection_FirmFragment$key } from "artifacts/BookingsSection_FirmFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import Section from "components/v2/Section";
import Link from "components/v2/Link";
import BookingsFirmTable from "components/shared/tables/BookingsFirmTable/BookingsFirmTable";
import moment from "moment";
import { dateFormat } from "lib/utils/dates";

interface BookingSectionProps {
  firmFragmentRef: BookingsSection_FirmFragment$key;
}

const BookingsSection = ({ firmFragmentRef }: BookingSectionProps) => {
  const firm = useFragment(
    graphql`
      fragment BookingsSection_FirmFragment on Firm {
        ...BookingsFirmTable_BookingsFirmPaginationFragment
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">
          {t("models.booking.plural")} - {moment().format(dateFormat)}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <BookingsFirmTable withFilters={false} firmFragmentRef={firm} />
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/bookings" fontSize="sm">
          {t("general.all")} {t("models.booking.plural")}
        </Link>
      </Grid>
    </Section>
  );
};
export default React.memo(BookingsSection);
