import React, { useState } from "react";
import styled from "styled-components";
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

const Wrapper = styled.div`
  .DateInput{
    width: 170px;
    font-family: 'Inter';
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
          startDate={startDate} // moment.Moment | null;
          startDateId="your_unique_start_date_id" // moment.Moment | null;
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // string;
          onDatesChange={handlendDatesChange} // (arg: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => void;
          focusedInput={focusedInput} // FocusedInputShape | null;
          onFocusChange={handleFocusChange} // (arg: FocusedInputShape | null) => void;

          startDatePlaceholderText={"Начало"}
          endDatePlaceholderText={"Конец"}
      />
      </Wrapper>
      
    )
}

export default DropDownCalander;