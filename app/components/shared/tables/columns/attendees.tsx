import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { graphql, useFragment } from "react-relay";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import RegisterAttendee from "../../RegisterAttendee";
import { attendees_BookingFragment$key } from "./__generated__/attendees_BookingFragment.graphql";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import AttendeeOptionsCell from "../../cells/AttendeeOptionsCell";

export function useAttendeesHeaders() {
  return React.useMemo(
    () => [
      { label: "Full Name", width: 150, key: "fullName" },
      { label: "Phone", width: 150, key: "phone" },
      { label: "Email", width: 150, key: "email" },
      { label: "Selected Options", width: 500, key: "attendeeOptions" },
      { label: "Was registered already", width: 50, key: "isRegistered" },
      { label: "Actions", width: 150, key: "actions" },
    ],
    []
  );
}

export function useAttendeesColumns(bookingFragmentRef: any) {
  const booking = useFragment<attendees_BookingFragment$key>(
    graphql`
      fragment attendees_BookingFragment on Booking {
        status
        event {
          requiresCheckIn
        }
        attendees {
          fullName
          phone
          email
          isRegistered
          attendeeOptions {
            eventOption {
              title
            }
            organizerPrice {
              cents
              currency {
                name
              }
            }
            attendeePrice {
              cents
              currency {
                name
              }
            }
          }
          ...RegisterAttendee_AttendeeFragment
        }
      }
    `,
    bookingFragmentRef
  );
  return React.useMemo(
    () =>
      booking.attendees.map((att) => ({
        fullName: att.fullName || "N/A",
        phone: att.phone || "N/A",
        email: att.email || "N/A",
        isRegistered: (
          <Tooltip title="This use was registered for this event already">
            <Checkbox label="" checked={!!att.isRegistered} readOnly />
          </Tooltip>
        ),
        attendeeOptions: (
          <AttendeeOptionsCell
            data={att.attendeeOptions.map(
              (
                {
                  eventOption: { title },
                  organizerPrice,
                  attendeePrice,
                }: Record<string, any>,
                index: number
              ) => ({
                id: index + 1,
                title: title || "N/A",
                organizerPrice:
                  getCurrencyFormat(
                    organizerPrice?.cents,
                    organizerPrice?.currency?.name
                  ) || "N/A",
                attendeePrice:
                  getCurrencyFormat(
                    attendeePrice?.cents,
                    attendeePrice?.currency?.name
                  ) || "N/A",
              })
            )}
          />
        ),
        actions: (
          <Stack direction="row" justifyContent="flex-end">
            {booking.event.requiresCheckIn &&
              !att.isRegistered &&
              booking.status === "active" && (
                <RegisterAttendee attendeeFragmentRef={att} />
              )}
            {booking.status === "active" && (
              <Tooltip title="Remove this attendee and refund it">
                <IconButton color="danger" size="sm">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        ),
      })),
    [booking]
  );
}
