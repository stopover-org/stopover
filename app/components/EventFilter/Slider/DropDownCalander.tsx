import React, { useState } from "react";
import styled from "styled-components";
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

function DropDownCalander() {
    const [startDate, setStartDate] = useState<moment.Moment | null>(moment());
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const handlendDatesChange = (newDates: {
      startDate: moment.Moment | null,
      endDate: moment.Moment | null
    }) => {
        setStartDate(newDates.startDate);
        setEndDate(newDates.endDate);
    }
  
    const handleFocusChange = (inputName: FocusedInputShape | null) => {
        setFocusedInput(inputName);
    }

    return (
      <DateRangePicker
        startDate={startDate} // moment.Moment | null;
        startDateId="your_unique_start_date_id" // moment.Moment | null;
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // string;
        onDatesChange={handlendDatesChange} // (arg: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => void;
        focusedInput={focusedInput} // FocusedInputShape | null;
        onFocusChange={handleFocusChange} // (arg: FocusedInputShape | null) => void;
      />
    )
}

export default DropDownCalander;