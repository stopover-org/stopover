import React from "react";
import moment, { Moment } from "moment";

function useMomentDates(dates: Array<Moment | Date | string>) {
  return React.useMemo(
    () =>
      dates
        // cast to moment
        .map((date) => moment(date)),
    [dates]
  );
}

export default useMomentDates;
