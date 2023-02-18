import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const SDatePicker = styled(({ className, ...props }) => (
  <DatePicker {...props} calendarClassName={className} />
))`
  .react-datepicker__day {
    box-sizing: content-box;
    border: 1px solid red;
    margin: unset;
    width: 35px;
    height: 35px;
  }
  .react-datepicker__day--outside-month {
    height: 0px;
    font-size: 0;
    color: transparent;
  }
`;

const Preview = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  return (
    <SDatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={([start, end]: [Date | null, Date | null]) => {
        setStartDate(start);

        setEndDate(end);
      }}
      selectsRange
      monthsShown={2}
      inline
    />
  );
};

export const DesignPreview = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

export default {
  title: "Datepicker",
};
