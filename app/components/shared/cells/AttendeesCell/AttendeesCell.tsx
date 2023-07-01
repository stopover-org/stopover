import React from "react";
import { Box, Stack } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import Table from "../../../v2/Table";

interface AttendeesCellProps {
  data: Array<Record<string, any>>;
}

const AttendeesCell = ({ data }: AttendeesCellProps) => {
  const [opened, setOpened] = React.useState(false);
  const headers = React.useMemo(
    () => [
      { label: "ID", width: 50, key: "id" },
      { label: "First Name", width: 100, key: "firstName" },
      { label: "Last Name", width: 100, key: "lastName" },
      { label: "Email", width: 100, key: "email" },
      { label: "Phone", width: 100, key: "phone" },
    ],
    []
  );
  return (
    <>
      <Stack direction="row" alignItems="center">
        Booking has {data.length} Attendees
        {data.length > 0 && (
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
      {opened && (
        <Box sx={{ marginBottom: "15px" }}>
          <Table hoverRow={false} headers={headers} data={data} />
        </Box>
      )}
    </>
  );
};

export default React.memo(AttendeesCell);
