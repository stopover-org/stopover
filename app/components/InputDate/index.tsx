import React, { useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Row from "../Row";
import Column from "../Column";
import { IconPosition, InputVariants } from "../StatesEnum";

const Wrapper = styled.div`
  width: 204px;
`;

const InputWrapper = styled(Row)<{
  padding: string;
  border: string;
  borderBottom: string;
}>`
  border-radius: 1px;
  padding: ${(props) => props.padding};
  .SingleDatePickerInput_calendarIcon_svg {
    display: none;
  }
  .SingleDatePickerInput__withBorder {
    border: none;
    border: ${(props) => props.border};
    border-bottom: ${(props) => props.borderBottom};
  }
  .DateInput_input__focused {
    border: none;
  }
  .DateInput_input {
    border: none;
  }
  .DateInput_input__disabled {
    background-color: white;
    color: #dbdbdb;
  }
  .SingleDatePickerInput__withBorder {
    background-color: white;
  }
`;
const Input = styled(SingleDatePicker)``;
const Content = styled(Row)`
  cursor: pointer;
  padding-top: 1px;
  padding-bottom: 1px;
`;

const SImage = styled.div<{ padding: string }>`
  padding: ${(props) => props.padding};
`;

type Props = {
  id?: string;
  value: moment.Moment | null;
  disabled?: boolean;
  size?: string;
  inputVariants?: InputVariants;
  iconPosition?: IconPosition;
  icon?: string;
  errorMessage?: string | React.ReactElement;
  hasError?: boolean;
  hint?: string | React.ReactElement;
  label?: string | React.ReactElement;
};

const InputDate = ({
  value,
  id = uuidv4(),
  inputVariants = InputVariants.COMMON,
  disabled,
  hasError,
  size = "0px",
  icon = "",
  label = "",
  hint = "",
  errorMessage = "",
  iconPosition = IconPosition.LEFT,
  ...props
}: Props) => {
  const [date, setDate] = useState<moment.Moment | null>(value);
  const [focusedInput, setFocusedInput] = useState(false);
  const handleFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
  };

  const handleDatesChange = (startDate: moment.Moment | null) => {
    setDate(startDate);
  };

  const borderStyle = () => {
    if (disabled) return "1px solid #797979";
    if (errorMessage || hasError) return "1px solid #BE0000";
    return "1px solid black";
  };
  return (
    <Wrapper>
      <label htmlFor={id}>
        <Column>
          <Content justifyContent="start">{label}</Content>
          <Content justifyContent="start">
            <InputWrapper
              padding={size}
              justifyContent="start"
              alignItems="center"
              border={
                inputVariants === InputVariants.COMMON ? borderStyle() : ""
              }
              borderBottom={
                inputVariants === InputVariants.OUTLINED ? borderStyle() : ""
              }
            >
              <Input
                date={date}
                onDateChange={handleDatesChange}
                focused={focusedInput}
                onFocusChange={handleFocusChange}
                disabled={disabled}
                inputIconPosition={iconPosition}
                customInputIcon={
                  icon && (
                    <SImage padding="0px 0px 0px 10px">
                      <Image
                        src={icon}
                        width="25px"
                        height="25px"
                        alt="calender"
                      />
                    </SImage>
                  )
                }
                showDefaultInputIcon={false}
                id={id}
                {...props}
              />
            </InputWrapper>
          </Content>
          <Content justifyContent="start">{errorMessage || hint}</Content>
        </Column>
      </label>
    </Wrapper>
  );
};

export default React.memo(InputDate);

/*
{!!icon && IconPosition.LEFT === iconPosition && (
  <SImage padding="0px 10px 0px 0px">
    <Image
      src={icon}
      width="25px"
      height="25px"
      alt="calender"
    />
  </SImage>
)}
{!!icon && IconPosition.RIGHT === iconPosition && (
  <SImage padding="0px 0px 0px 10px">
    <Image
      src={icon}
      width="25px"
      height="25px"
      alt="calender"
    />
  </SImage>
)} */
