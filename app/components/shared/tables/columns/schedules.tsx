import React from "react";
import moment from "moment";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import Link from "../../../v2/Link";

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["disabled"],
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};
export function useSchedulesHeaders() {
  return React.useMemo(
    () => [
      {
        label: "Event",
        width: 100,
        key: "eventId",
      },
      {
        label: "Date",
        width: 150,
        key: "date",
      },
      {
        label: "Attendees",
        width: 50,
        key: "attendees",
      },
      {
        label: "Bookings",
        width: 50,
        key: "bookings",
      },
      {
        label: "Status",
        width: 100,
        key: "status",
      },
    ],
    []
  );
}

export function useSchedulesColumns(
  schedules: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      schedules.map((scheduleRow) => ({
        date: getHumanDateTime(moment(scheduleRow.scheduledFor)),
        bookings: scheduleRow.bookings?.length,
        attendees: scheduleRow.bookings?.reduce(
          (acc: number, booking: Record<string, any>) => {
            acc += booking.attendees.length;
            return acc;
          },
          0
        ),
        status: <TagColor status={scheduleRow.status} />,
        eventId: (
          <Link href={`/my-firm/events/${scheduleRow.event?.id}`} primary>
            {scheduleRow.event?.id}
          </Link>
        ),
      })),
    [schedules]
  );
}
