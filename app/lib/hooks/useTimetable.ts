import moment, { Moment } from "moment";
import React from "react";

export function useTimetable<
  T extends ReadonlyArray<{ readonly availableDates: ReadonlyArray<any> }>
>(events: T, timetableDate: Moment): Record<string, any> {
  return React.useMemo(() => {
    const timetable: Record<string, Record<string, any>> = {};
    events.forEach((event) => {
      const timetableDates = event.availableDates?.filter((date: string) =>
        moment(date).isSame(timetableDate, "day")
      );

      timetableDates.forEach((date: string) => {
        if (timetable[date]) {
          timetable[date].push(event);
        } else {
          timetable[date] = [event] as Record<string, any>;
        }
      });
    });

    // order by keys
    return Object.keys(timetable)
      .sort()
      .reduce((obj: Record<string, Record<string, any>>, key: string) => {
        obj[key] = timetable[key];
        return obj;
      }, {});
  }, [events, timetableDate]);
}
