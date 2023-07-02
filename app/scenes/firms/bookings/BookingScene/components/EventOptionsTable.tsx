import { graphql, useFragment } from "react-relay";
import React from "react";
import Table from "../../../../../components/v2/Table";
import { EventOptionsTable_BookingFragment$key } from "./__generated__/EventOptionsTable_BookingFragment.graphql";
import {
  useBookingOptionsColumns,
  useBookingOptionsHeaders,
} from "../../../../../components/shared/tables/columns/bookingOptions";

interface EventOptionsTableProps {
  bookingFragmentRef: any;
}

const EventOptionsTable = ({ bookingFragmentRef }: EventOptionsTableProps) => {
  const booking = useFragment<EventOptionsTable_BookingFragment$key>(
    graphql`
      fragment EventOptionsTable_BookingFragment on Booking {
        ...bookingOptions_BookingFragmentRef
      }
    `,
    bookingFragmentRef
  );
  const headers = useBookingOptionsHeaders();
  const data = useBookingOptionsColumns(booking);
  return <Table headers={headers} data={data} />;
};

export default React.memo(EventOptionsTable);
