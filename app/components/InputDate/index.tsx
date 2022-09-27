import React, { useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.form``;

type Props = {
  id?: string;
};

const InputDate = ({ id = uuidv4() }: Props) => {
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const handleFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
  };

  const handleDatesChange = (startDate: moment.Moment | null) => {
    setDate(startDate);
  };
  return (
    <Wrapper>
      <SingleDatePicker
        date={date}
        onDateChange={handleDatesChange}
        focused={focusedInput}
        onFocusChange={handleFocusChange}
        id={id}
      />
    </Wrapper>
  );
};

export default React.memo(InputDate);
