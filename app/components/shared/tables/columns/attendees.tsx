import React from "react";
import { Stack } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import RegisterAttendee from "../../RegisterAttendee";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import AttendeeOptionsCell from "../../cells/AttendeeOptionsCell";
import { attendees_BookingFragment$key } from "../../../../artifacts/attendees_BookingFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import DeregisterAttendee from "../../DeregisterAttendee";
import RemoveAttendee from "../../RemoveAttendee";
import ChangeAttendeeOptionAvailability from "../../ChangeAttendeeOptionAvailability";
import { ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key } from "../../../../artifacts/ChangeAttendeeOptionAvailability_AttendeeOptionFragment.graphql";

export function useAttendeesHeaders() {
  return React.useMemo(
    () => [
      { label: "Full Name", width: 150, key: "fullName" },
      { label: "Phone", width: 150, key: "phone" },
      { label: "Email", width: 150, key: "email" },
      { label: "Selected Options", width: 500, key: "attendeeOptions" },
      { label: "Status", width: 150, key: "status" },
      { label: "Actions", width: 50, key: "actions" },
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

const OptionTagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: "not_available",
    primary: "available",
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
            status
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
            ...ChangeAttendeeOptionAvailability_AttendeeOptionFragment
          }
          ...RegisterAttendee_AttendeeFragment
          ...DeregisterAttendee_AttendeeFragment
          ...RemoveAttendee_AttendeeFragment
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
              (opt: Record<string, any>, index: number) => {
                const {
                  eventOption: { title },
                  organizerPrice,
                  attendeePrice,
                  status,
                } = opt;
                return {
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
                  status: <OptionTagColor status={status} />,
                  actions: (
                    <ChangeAttendeeOptionAvailability
                      optionFragmentRef={
                        opt as ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key
                      }
                    />
                  ),
                };
              }
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
            {booking.event.requiresCheckIn &&
              att.status === "registered" &&
              booking.status === "active" && (
                <DeregisterAttendee attendeeFragmentRef={att} />
              )}
            {att.status !== "removed" && booking.status === "active" && (
              <RemoveAttendee attendeeFragmentRef={att} />
            )}
          </Stack>
        ),
      })),
    [booking]
  );
}
