import moment, { Moment } from "moment";
import React from "react";
import { dateFormat } from "../utils/dates";

function useClosestDate(dates: Array<Moment | Date | string>) {
  const today = moment(Date.now());
  const uniqueDates = React.useMemo(
    () =>
      dates
        // cast to moment
        .map((date) => moment(date, dateFormat))
        // compact array
        .reduce((result, date) => {
          const foundDate = result.find((dt) => date.isSame(dt, "day"));
          if (!foundDate) {
            result.push(date);
          }
          return result;
        }, [] as Moment[])
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
  if (uniqueDates.length > 0) return uniqueDates[0];
  return null;
}

export default useClosestDate;
