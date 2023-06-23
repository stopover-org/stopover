import React from "react";
import { Stack } from "@mui/joy";
import Table from "../../../../../components/v2/Table";

const AttendeesCell = ({
  id,
  opened,
  attendeesCount,
  data,
}: {
  id: string;
  opened: string[];
  attendeesCount: number;
  data: Array<Record<string, any>>;
}) => {
  const headers = React.useMemo(
    () => [
      { label: "ID", width: 50, key: "id" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "email", key: "email" },
      { label: "Phone", key: "phone" },
    ],
    []
  );
  if (opened.includes(id)) {
    return <Table headers={headers} data={data} />;
  }
  return <Stack>Booking has {attendeesCount} Attendees</Stack>;
};

export default React.memo(AttendeesCell);
