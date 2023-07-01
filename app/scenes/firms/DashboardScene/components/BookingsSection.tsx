import React, { useMemo } from "react";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import moment from "moment";
import { Grid } from "@mui/joy";
import Table from "../../../../components/v2/Table";

import { BookingsSection_FirmFragment$key } from "./__generated__/BookingsSection_FirmFragment.graphql";
import Typography from "../../../../components/v2/Typography/Typography";
import Section from "../../../../components/v2/Section";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import useEdges from "../../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Link from "../../../../components/v2/Link";
import BookingsFirmTable from "../../../../components/shared/tables/BookingsFirmTable/BookingsFirmTable";

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

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Bookings</Typography>
      </Grid>
      <Grid xs={12}>
        <BookingsFirmTable firmFragmentRef={firm} />;
      </Grid>

      <Grid xs={12}>
        <Link href="/my-firm/bookings" fontSize="sm">
          All Bookings
        </Link>
      </Grid>
    </Section>
  );
};
export default React.memo(BookingsSection);
