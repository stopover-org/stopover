import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Column from "../Column";
import Row from "../Row";
import { IconPosition, InputVariants } from "../StatesEnum";
import CaretUp from "../icons/Outline/Interface/Caret_up.svg";
import CaretDown from "../icons/Outline/Interface/Caret_down.svg";

const Wrapper = styled.form``;
const Content = styled(Row)`
  cursor: pointer;
`;

const InputWrapper = styled.div<{
  padding: string;
  border: string;
  borderBottom: string;
}>`
  border-radius: 1px;
  padding: ${(props) => props.padding};
  width: 100%;
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
`;

const SInput = styled.input`
  width: 100%;
  font-weight: 400;
  font-family: "Roboto";
  font-size: 18px;
`;

const SArrow = styled(Column)`
  height: 20px;
  width: 16px;
  margin: 0px 10px 0px 10px;
`;

const SImage = styled.div<{ padding: string }>`
  padding: ${(props) => props.padding};
`;

type Props = {
  value?: string;
  id?: string;
  size?: string;
  type?: string;
  icon?: string;
  minValue?: number;
  maxValue?: number;
  iconPosition?: IconPosition;
  inputVariants?: InputVariants;
  disabled?: boolean;
  label?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
};

const Input = ({
  value = "",
  size = "0px",
  id = uuidv4(),
  type = "text",
  label = "",
  hint = "",
  errorMessage = "",
  minValue,
  maxValue,
  disabled,
  icon,
  iconPosition = IconPosition.LEFT,
  inputVariants = InputVariants.COMMON,
  ...props
}: Props) => {
  const [valueState, setValueState] = useState<string>(value);
  const changeValue = (delta: number) => {
    if (
      minValue &&
      maxValue &&
      +valueState + delta >= minValue &&
      +valueState + delta <= maxValue
    ) {
      setValueState((+valueState + delta).toString());
      return;
    }
    if (minValue && +valueState + delta >= minValue) {
      setValueState((+valueState + delta).toString());
      return;
    }
    if (maxValue && +valueState + delta <= maxValue) {
      setValueState((+valueState + delta).toString());
      return;
    }
    setValueState((+valueState + delta).toString());
  };

  const changeHandler = (inputValue: string) => {
    if (type === "number") {
      if (
        minValue &&
        maxValue &&
        +inputValue >= minValue &&
        +inputValue <= maxValue
      ) {
        setValueState(inputValue);
        return;
      }
      if (minValue && +inputValue >= minValue) {
        setValueState(inputValue);
        return;
      }
      if (maxValue && +inputValue <= maxValue) {
        setValueState(inputValue);
        return;
      }
      if (maxValue) {
        setValueState(maxValue.toString());
        return;
      }
      setValueState(inputValue);
    } else {
      setValueState(inputValue);
    }
  };

  const borderStyle = () => {
    if (disabled) return "1px solid #797979";
    if (errorMessage) return "1px solid #BE0000";
    return "1px solid black";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(uuidv4());
  return (
    <Wrapper>
      <label htmlFor={id}>
        <Column>
          <Content justifyContent="start">{label}</Content>
          <Content justifyContent="start">
            <InputWrapper
              padding={size}
              border={
                inputVariants === InputVariants.COMMON ? borderStyle() : ""
              }
              borderBottom={
                inputVariants === InputVariants.OUTLINED ? borderStyle() : ""
              }
            >
              <Content>
                <>
                  {!!icon && IconPosition.LEFT === iconPosition && (
                    <SImage padding="0px 10px 0px 0px">
                      <Image
                        src={icon}
                        width="25px"
                        height="25px"
                        alt="mag glass"
                      />
                    </SImage>
                  )}
                  <SInput
                    id={id}
                    onChange={(e) => changeHandler(e.target.value)}
                    value={valueState}
                    disabled={disabled}
                    {...props}
                  />
                  {type === "number" && (
                    <SArrow>
                      <Image
                        onClick={() => changeValue(1)}
                        src={CaretUp}
                        width="10px"
                        height="10px"
                        alt="arrow"
                      />
                      <Image
                        onClick={() => changeValue(-1)}
                        src={CaretDown}
                        width="10px"
                        height="10px"
                        alt="arrow"
                      />
                    </SArrow>
                  )}
                  {!!icon && IconPosition.RIGHT === iconPosition && (
                    <SImage padding="0px 0px 0px 10px">
                      <Image
                        src={icon}
                        width="25px"
                        height="25px"
                        alt="mag glass"
                      />
                    </SImage>
                  )}
                </>
              </Content>
            </InputWrapper>
          </Content>
          <Content justifyContent="start">{errorMessage || hint}</Content>
        </Column>
      </label>
    </Wrapper>
  );
};

export default React.memo(Input);
