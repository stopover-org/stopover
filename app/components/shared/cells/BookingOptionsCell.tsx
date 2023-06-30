import React from "react";
import { Stack } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import Table from "../../v2/Table/Table";

interface BookingOptionsCellProps {
  bookingOptionsCount: number;
  data: Array<Record<string, any>>;
}

const BookingOptionsCell = React.memo(
  ({ bookingOptionsCount, data }: BookingOptionsCellProps) => {
    const [opened, setOpened] = React.useState(false);
    const headers = React.useMemo(
      () => [
        { label: "ID", width: 50, key: "id" },
        { label: "Title", width: 100, key: "title" },
        { label: "You get", width: 100, key: "organizerPrice" },
        { label: "Attendee pay", width: 100, key: "attendeePrice" },
      ],
      []
    );
    return (
      <>
        <Stack direction="row" alignItems="center">
          Booking has {bookingOptionsCount} Options&nbsp;
          {bookingOptionsCount > 0 && (
            <IconButton size="sm" onClick={() => setOpened(!opened)}>
              {opened ? <UnfoldLessDoubleIcon /> : <UnfoldMoreDoubleIcon />}
            </IconButton>
          )}
        </Stack>
        {opened && <Table hoverRow={false} headers={headers} data={data} />}
      </>
    );
  }
);

export default React.memo(BookingOptionsCell);
