import moment, { Moment } from "moment";
import React from "react";
import useUniqueMomentDates from "./useUniqueMomentDates";

function useClosestDate(dates: Array<Moment | Date | string>) {
  const today = moment(Date.now());
  const uniqueDates = useUniqueMomentDates(dates);
  const sortedDates = React.useMemo(
    () =>
      uniqueDates
        // only future dates
        .filter((dt) => dt.isAfter(today))
        // sort
        .sort((a, b) => {
          const distanceA = Math.abs(+today - +a);
          const distanceB = Math.abs(+today - +b);
          return distanceA - distanceB;
        }),
    [dates]
  );
  if (sortedDates.length > 0) return uniqueDates[0];
  return null;
}

export default useClosestDate;
