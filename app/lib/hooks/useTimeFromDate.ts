import { Moment } from "moment";
import React from "react";
import { timeFormat } from "../utils/dates";

function useTimeFromDate(dates: Moment[], selectedDate?: Moment) {
  return React.useMemo(() => {
    if (!selectedDate) return [];
    const sameDates = dates.filter((dt) => dt.isSame(selectedDate, "day"));
    if (sameDates.length === 0) return [];
    return sameDates.map((dt) => dt.format(timeFormat));
  }, [dates, selectedDate]);
}

export default useTimeFromDate;
