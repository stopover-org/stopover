import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { graphql, useFragment } from "react-relay";
import RegisterAttendee from "../../RegisterAttendee";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import AttendeeOptionsCell from "../../cells/AttendeeOptionsCell";
import { attendees_BookingFragment$key } from "../../../../artifacts/attendees_BookingFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";

export function useAttendeesHeaders() {
  return React.useMemo(
    () => [
      { label: "Full Name", width: 150, key: "fullName" },
      { label: "Phone", width: 150, key: "phone" },
      { label: "Email", width: 150, key: "email" },
      { label: "Selected Options", width: 500, key: "attendeeOptions" },
      { label: "Status", width: 50, key: "status" },
      { label: "Actions", width: 150, key: "actions" },
    ],
    []
  );
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: "removed",
    neutral: "not_registered",
    primary: "registered",
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

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
          status
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
        status: <TagColor status={att.status} />,
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
              att.status === "not_registered" &&
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
