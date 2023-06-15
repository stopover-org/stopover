import React, { useMemo } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import { Grid } from "@mui/joy";
import Table from "../../../components/v2/Table";

import { BookingsSection_FirmFragment$key } from "./__generated__/BookingsSection_FirmFragment.graphql";
import Typography from "../../../components/v2/Typography/Typography";
import Section from "../../../components/v2/Section";
import { getHumanDateTime } from "../../../lib/utils/dates";
import useEdges from "../../../lib/hooks/useEdges";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Link from "../../../components/v2/Link";

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
                id
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
  const bookings = useEdges(data.bookings);
  const actualBookings = useMemo(
    () =>
      bookings.map((booking) => ({
        event: (
          <Link primary href={`/events/${booking.event.id}`}>
            {booking.event.title}
          </Link>
        ),
        attendee: booking.attendees.length,
        price: getCurrencyFormat(
          booking.organizerTotalPrice.cents,
          booking.organizerTotalPrice.currency.name
        ),
        date: getHumanDateTime(moment(booking.bookedFor)),
      })),
    [bookings]
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Bookings</Typography>
      </Grid>
      <Grid xs={12}>
        <Table
          data={actualBookings}
          headers={[
            {
              label: "Event",
              key: "event",
            },
            {
              label: "Attendees",
              key: "attendee",
            },
            {
              label: "Price",
              key: "price",
            },
            {
              label: "Date",
              key: "date",
            },
          ]}
          aria-label="basic table"
        />
      </Grid>
    </Section>
  );
};
export default React.memo(BookingsSection);
