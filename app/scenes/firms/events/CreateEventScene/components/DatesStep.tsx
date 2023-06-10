import React from "react";
import RecurringDateFieldset from "./RecurringDateFieldset";
import SingleDatesFieldset from "./SingleDatesFieldset";
import EventOptionsFieldset from "./EventOptionsFieldset";

const DatesStep = () => (
  <>
    <RecurringDateFieldset />
    <SingleDatesFieldset />
  </>
);

export default React.memo(DatesStep);
