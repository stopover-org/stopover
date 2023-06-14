import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import { Grid } from "@mui/joy";
import Table from "../../../components/v2/Table";

import { BookingsSection_FirmFragment$key } from "./__generated__/BookingsSection_FirmFragment.graphql";
import Typography from "../../../components/v2/Typography/Typography";
import Section from "../../../components/v2/Section";
import { getHumanDateTime } from "../../../lib/utils/dates";

interface BookingSectionProps {
  firmFragmentRef: BookingsSection_FirmFragment$key;
}
const BookingsSection = ({ firmFragmentRef }: BookingSectionProps) => {
  const { data } = usePaginationFragment(
    graphql`
      fragment BookingsSection_FirmFragment on Firm
      @refetchable(queryName: "BookingSectionFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        bookings(first: $count, after: $cursor)
          @connection(key: "DashboardScene_query_bookings") {
          edges {
            node {
              id
              event {
                title
              }
              attendees {
                id
              }
              organizerTotalPrice {
                cents
                currency {
                  name
                  symbol
                }
              }
              bookedFor
            }
          }
        }
      }
    `,
    firmFragmentRef
  );

  const getBookings = () =>
    data.bookings.edges.map((booking) => ({
      event: <Typography>{booking?.node.event.title}</Typography>,
      attendee: <Typography>{booking?.node.attendees.length}</Typography>,
      price: (
        <Typography>
          {booking?.node?.organizerTotalPrice.cents}{" "}
          {booking?.node?.organizerTotalPrice.currency.name}
        </Typography>
      ),
      date: (
        <Typography>
          {getHumanDateTime(moment(booking?.node?.bookedFor))}
        </Typography>
      ),
    }));

  return (
    <Section>
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography level="h3">Bookings</Typography>
        </Grid>
        <Grid xs={12}>
          <Table
            data={getBookings()}
            headers={[
              {
                label: <Typography>Event</Typography>,
                key: "event",
              },
              {
                label: <Typography>Attendee</Typography>,
                key: "attendee",
              },
              {
                label: <Typography>Price</Typography>,
                key: "price",
              },
              {
                label: <Typography>Date</Typography>,
                key: "date",
              },
            ]}
            aria-label="basic table"
          />
        </Grid>
      </Grid>
    </Section>
  );
};
export default React.memo(BookingsSection);
