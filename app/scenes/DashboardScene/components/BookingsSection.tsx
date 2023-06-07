import React from "react";
import { graphql, useFragment } from "react-relay";
import Table from "../../../components/v2/Table";
import { BookingsSection_FirmFragment$key } from "./__generated__/BookingsSection_FirmFragment.graphql";

interface BookingSectionProps {
  firmFragmentRef: BookingsSection_FirmFragment$key;
}
const BookingsSection = ({ firmFragmentRef }: BookingSectionProps) => {
  const booking = useFragment(
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
  return <Table data={[]} headers={[]} aria-label="basic table" />;
};
export default React.memo(BookingsSection);
