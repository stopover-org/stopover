import React from "react";
import { IconButton, Stack } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";

export function useBookingOptionsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "Option Name",
        key: "title",
      },
      {
        label: "You Get",
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        key: "attendeePrice",
      },
      {
        label: "",
        key: "actions",
      },
    ],
    []
  );
}

export function useBookingOptionsColumns(
  bookingOptions: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      bookingOptions.map((opt) => ({
        title: opt.eventOption.title,

        organizerPrice: getCurrencyFormat(
          opt.organizerPrice.cents,
          opt.organizerPrice.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          opt.attendeePrice.cents,
          opt.attendeePrice.currency.name
        ),
        actions: (
          <Stack direction="row" justifyContent="flex-end">
            <IconButton color="danger" size="sm">
              <DeleteIcon />
            </IconButton>
          </Stack>
        ),
      })),
    [bookingOptions]
  );
}
