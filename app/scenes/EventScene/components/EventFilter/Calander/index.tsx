import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

const Wrapper = styled.div`
  .DateInput {
    width: 120px;
    font-weight: 400;
    line-height: 29px;
  }

  .DateInput_input {
    border: none;
    height: 50px;
    margin: -0px;
    font-size: 24px;
  }

  .DateRangePickerInput__withBorder {
    border: 2px solid #fdaa4c;
    border-radius: 3px;
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

  .DateRangePickerInput_arrow_svg {
    display: none;
  }

  .DateRangePickerInput_arrow {
    display: none;
  }

  .CalendarDay__selected_span {
    background: #fdaa4c;
    border: 1px solid #fdaa4c;
  }

  .CalendarDay__selected {
    background: #ef8336;
    border: 1px solid #ef8336;
  }

  .DayPickerKeyboardShortcuts_show__bottomRight::before {
    border-right: 33px solid #fdaa4c;
  }

  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    background: #ffcca7;
    border: 1px double #ffcca7;
    color: white;
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: #ef8336;
    border: 1px double #ef8336;
    color: #fff;
  }
`;

type Props = {
  dateHandler: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => void;
};

const Index = (props: Props) => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const handleDatesChange = (newDates: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(newDates.startDate);

    setEndDate(newDates.endDate);
  };

  const handleFocusChange = (inputName: FocusedInputShape | null) => {
    setFocusedInput(inputName);
  };

  useEffect(() => {
    props.dateHandler(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <DateRangePicker
        startDate={startDate}
        startDateId="event_filters_start_date_id"
        endDate={endDate}
        endDateId="event_filters_end_date_id"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        startDatePlaceholderText="Начало"
        endDatePlaceholderText="Конец"
      />
    </Wrapper>
  );
};

export default Index;
