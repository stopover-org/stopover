import React from "react";
import { Stack } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import Table from "../../../../../components/v2/Table";

interface AttendeesCellProps {
  attendeesCount: number;
  data: Array<Record<string, any>>;
}

const AttendeesCell = ({ attendeesCount, data }: AttendeesCellProps) => {
  const [opened, setOpened] = React.useState(false);
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
  return (
    <>
      <Stack direction="row" alignItems="center">
        Booking has {attendeesCount} Attendees
        {attendeesCount > 0 && (
          <IconButton
            size="sm"
            onClick={() => setOpened(!opened)}
            variant="solid"
            sx={{ marginLeft: "20px" }}
          >
            {opened ? <UnfoldLessDoubleIcon /> : <UnfoldMoreDoubleIcon />}
          </IconButton>
        )}
      </Stack>
      {opened && <Table hoverRow={false} headers={headers} data={data} />}
    </>
  );
};

export default React.memo(AttendeesCell);
