import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "../../../../../components/v2/Table";
import { AttendeesTable_BookingFragment$key } from "./__generated__/AttendeesTable_BookingFragment.graphql";
import Checkbox from "../../../../../components/v2/Checkbox";
import Button from "../../../../../components/v2/Button";

interface AttendeesTableProps {
  bookingFragmentRef: AttendeesTable_BookingFragment$key;
}

const AttendeesTable = ({ bookingFragmentRef }: AttendeesTableProps) => {
  const booking = useFragment<AttendeesTable_BookingFragment$key>(
    graphql`
      fragment AttendeesTable_BookingFragment on Booking {
        attendees {
          fullName
          email
          phone
          isRegistered
        }
      }
    `,
    bookingFragmentRef
  );

  const data = React.useMemo(
    () =>
      booking.attendees.map((att) => ({
        fullName: att.fullName || "N/A",
        phone: att.phone || "N/A",
        email: att.email || "N/A",
        isRegistered: (
          <Checkbox
            label=""
            defaultChecked={att.isRegisterd}
            readOnly
            color="primary"
            size="sm"
          />
        ),
        checkIn: <Button size="sm">Register User</Button>,
        remove: (
          <IconButton color="danger" size="sm">
            <DeleteIcon />
          </IconButton>
        ),
      })),
    [booking]
  );

  const headers = React.useMemo(
    () => [
      { label: "Full Name", key: "fullName" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "Was registered already", key: "isRegistered" },
      { label: "", key: "checkIn" },
      { label: "", key: "remove" },
    ],
    []
  );

  return <Table headers={headers} data={data} />;
};

export default React.memo(AttendeesTable);
