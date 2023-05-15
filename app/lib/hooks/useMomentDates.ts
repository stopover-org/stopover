import React from "react";
import moment, { Moment } from "moment";
import { dateTimeFormat } from "../utils/dates";

function useMomentDates(dates: Array<Moment | Date | string>) {
  return React.useMemo(
    () =>
      dates
        // cast to moment
        .map((date) => moment(date, dateTimeFormat)),
    [dates]
  );
}

export default useMomentDates;
