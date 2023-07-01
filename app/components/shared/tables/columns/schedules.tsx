import React from "react";
import moment from "moment";
import { getHumanDateTime } from "../../../../lib/utils/dates";

export function useSchedulesHeaders() {
  return React.useMemo(
    () => [
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
        attendees: scheduleRow.bookings.reduce(
          (acc: number, booking: Record<string, any>) => {
            acc += booking.attendees.length;
            return acc;
          },
          0
        ),
      })),
    [schedules]
  );
}
