import { Moment } from "moment";
import React from "react";

// return all possible times for the current date
function useTimeFromDate(dates: Moment[], selectedDate?: Moment | null) {
  return React.useMemo(() => {
    const sameDates = dates.filter((dt) => dt.isSame(selectedDate, "day"));
    if (sameDates.length === 0) return [];

    return sameDates.sort();
  }, [dates, selectedDate]);
}

export default useTimeFromDate;
