import React, { useState } from "react";
import styled from "styled-components";
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

const Wrapper = styled.div`
  .DateInput{
    width: 170px;
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
