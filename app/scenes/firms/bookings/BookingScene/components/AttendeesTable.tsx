import { graphql, useFragment } from "react-relay";
import React from "react";
import Table from "components/v2/Table";
import { AttendeesTable_BookingFragment$key } from "artifacts/AttendeesTable_BookingFragment.graphql";
import {
  useAttendeesColumns,
  useAttendeesHeaders,
} from "components/shared/tables/columns/attendees";

interface AttendeesTableProps {
  bookingFragmentRef: AttendeesTable_BookingFragment$key;
}

const AttendeesTable = ({ bookingFragmentRef }: AttendeesTableProps) => {
  const booking = useFragment<AttendeesTable_BookingFragment$key>(
    graphql`
      fragment AttendeesTable_BookingFragment on Booking {
        ...attendees_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const data = useAttendeesColumns(booking);
  const headers = useAttendeesHeaders();

  return <Table headers={headers} data={data} hoverRow={false} />;
};

export default React.memo(AttendeesTable);
