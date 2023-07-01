import React from "react";
import { Grid, Stack, TabPanel } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import Typography from "../../../../../components/v2/Typography/Typography";
import { BookingsInformation_EventFragment$key } from "./__generated__/BookingsInformation_EventFragment.graphql";
import BookingsEventTable from "../../../../../components/shared/tables/BookingsEventTable";

interface BookingsInformationProps {
  eventFragmentRef: BookingsInformation_EventFragment$key;
  index: number;
}

const BookingsInformation = ({
  eventFragmentRef,
  index,
}: BookingsInformationProps) => {
  const event = useFragment(
    graphql`
      fragment BookingsInformation_EventFragment on Event {
        ...BookingsEventTable_BookingsPaginationFragment
      }
    `,
    eventFragmentRef
  );

  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Typography level="h4">All Bookings</Typography>
          <BookingsEventTable eventFragmentRef={event} withPagination />
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default React.memo(BookingsInformation);
