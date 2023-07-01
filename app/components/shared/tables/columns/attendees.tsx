import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import Button from "../../../v2/Button/Button";

export function useAttendeesHeaders() {
  return React.useMemo(
    () => [
      { label: "Full Name", key: "fullName" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "Was registered already", key: "isRegistered" },
      { label: "", key: "actions" },
    ],
    []
  );
}

export function useAttendeesColumns(
  attendees: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      attendees.map((att) => ({
        fullName: att.fullName || "N/A",
        phone: att.phone || "N/A",
        email: att.email || "N/A",
        isRegistered: (
          <Tooltip title="This use was registered for this event already">
            <Checkbox label="" checked={!!att.isRegistered} readOnly />
          </Tooltip>
        ),
        actions: (
          <Stack direction="row">
            <Button sx={{ marginRight: "10px" }} size="sm">
              Register User
            </Button>
            <Tooltip title="Remove this attendee and refund it">
              <IconButton color="danger" size="sm">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      })),
    [attendees]
  );
}
