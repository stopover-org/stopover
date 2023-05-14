import { Moment } from "moment";
import React from "react";
import { timeFormat } from "../utils/dates";

// return all possible times for the current date
function useTimeFromDate(dates: Moment[], selectedDate?: Moment | null) {
  return React.useMemo(() => {
    if (!selectedDate) return [];
    const currentTime = selectedDate.format(timeFormat);
    const sameDates = dates.filter((dt) => dt.isSame(selectedDate, "day"));
    if (sameDates.length === 0) return [];
    const times = [...sameDates, selectedDate].map((dt) =>
      dt.format(timeFormat)
    );
    if (!times.includes(currentTime)) {
      times.push(currentTime);
    }
    return times.sort();
  }, [dates, selectedDate]);
}

export default useTimeFromDate;
