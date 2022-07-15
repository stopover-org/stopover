import React, { useState } from "react";
import styled from "styled-components";
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

const Wrapper = styled.div`
  .DateInput{
    width: 170px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
  }
  .DateInput_input{    
    border: 2px solid #FF8A00;
    height: 50px;
    margin: -0px;
  }
  .DateRangePickerInput__withBorder{
    border: none;
    width: 390px;
    display: flex;
    justify-content: space-between;
  }
  .DateRangePickerInput_arrow_svg{
    display: none;
  }
  .DateRangePickerInput_arrow{
    display: none;
  }
  .CalendarDay__selected_span{
    background: #fdaa4c;
    border: 1px solid  #fdaa4c;
  }
  .CalendarDay__selected{
    background: #ef8336;
    border: 1px solid #ef8336;
  }
`;

function DropDownCalander() {
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
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
      <Wrapper>
        <DateRangePicker
          startDate={startDate}
          startDateId="your_unique_start_date_id"
          endDate={endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={handlendDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          startDatePlaceholderText={"Начало"}
          endDatePlaceholderText={"Конец"}
      />
      </Wrapper>
    )
}

export default DropDownCalander;