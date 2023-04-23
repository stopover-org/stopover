import { Moment } from "moment";
import React from "react";
import useMomentDates from "./useMomentDates";

function useUniqueMomentDates(dates: Array<Moment | Date | string>) {
  const momentDates = useMomentDates(dates);
  return React.useMemo(
    () =>
      momentDates
        // compact array
        .reduce((result, date) => {
          const foundDate = result.find((dt) => date.isSame(dt, "day"));
          if (!foundDate) {
            result.push(date);
          }
          return result;
        }, [] as Moment[]),
    [dates]
  );
}

export default useUniqueMomentDates;
