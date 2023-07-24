import React from "react";
import { IconButton, Stack } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import RegisterAttendee from "../../RegisterAttendee";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { attendees_BookingFragment$key } from "../../../../artifacts/attendees_BookingFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import DeregisterAttendee from "../../DeregisterAttendee";
import RemoveAttendee from "../../RemoveAttendee";
import ChangeAttendeeOptionAvailability from "../../ChangeAttendeeOptionAvailability";
import { ChangeAttendeeOptionAvailability_AttendeeOptionFragment$key } from "../../../../artifacts/ChangeAttendeeOptionAvailability_AttendeeOptionFragment.graphql";
import OptionTagColor from "../../OptionTagColor/OptionTagColor";
import Typography from "../../../v2/Typography/Typography";
import Table from "../../../v2/Table/Table";

export function useAttendeesHeaders() {
  return React.useMemo(
    () => [
      { label: "", width: 50, key: "index" },
      { label: "Full Name", width: 150, key: "fullName" },
      { label: "Phone", width: 150, key: "phone" },
      { label: "Email", width: 150, key: "email" },
      { label: "Status", width: 150, key: "status" },
      { label: "Selected Options", width: 150, key: "expand" },
      { label: "Actions", width: 100, key: "actions" },
    ],
    []
  );
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    neutral: ["not_registered"],
    primary: ["registered"],
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

  const attendeeOptionsHeaders = React.useMemo(
    () => [
      { label: "ID", width: 50, key: "id" },
      { label: "Title", width: 100, key: "title" },
      { label: "You get", width: 100, key: "organizerPrice" },
      { label: "Attendee pay", width: 100, key: "attendeePrice" },
      { label: "Status", width: 100, key: "status" },
      { label: "", width: 100, key: "actions" },
    ],
    []
  );
  return React.useMemo(
    () =>
      booking.attendees.map((att, index) => {
        const attendeeOptionsData = att.attendeeOptions.map(
          (opt: Record<string, any>, i: number) => {
            const {
              eventOption: { title },
              organizerPrice,
              attendeePrice,
              status,
            } = opt;
            return {
              id: i + 1,
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
        );
        return {
          index: index + 1,
          fullName: att.fullName?.trim() === "" ? "N/A" : att.fullName,
          phone: att.phone || "N/A",
          email: att.email || "N/A",
          status: <TagColor status={att.status} />,
          expand: (
            <IconButton size="sm">
              <UnfoldMoreDoubleIcon />
            </IconButton>
          ),
          tables: [
            <Typography level="h5">Attendee Options</Typography>,
            <Table
              hoverRow={false}
              headers={attendeeOptionsHeaders}
              data={attendeeOptionsData}
            />,
          ],
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
        };
      }),
    [booking]
  );
}
