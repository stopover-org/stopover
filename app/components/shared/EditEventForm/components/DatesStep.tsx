import React from "react";
import RecurringDateFieldset from "./RecurringDateFieldset";
import SingleDatesFieldset from "./SingleDatesFieldset";
import EndDateFieldset from "./EndDateFieldset";

const DatesStep = () => (
  <>
    <RecurringDateFieldset />
    <SingleDatesFieldset />
    <EndDateFieldset />
  </>
);

export default React.memo(DatesStep);
