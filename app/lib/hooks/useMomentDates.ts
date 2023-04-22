import React from "react";
import moment, { Moment } from "moment";
import { dateFormat } from "../utils/dates";

function useMomentDates(dates: Array<Moment | Date | string>) {
  return React.useMemo(
    () =>
      dates
        // cast to moment
        .map((date) => moment(date, dateFormat)),
    [dates]
  );
}

export default useMomentDates;
