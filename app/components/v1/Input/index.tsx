import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";
import { IconPosition, InputSizes, InputVariants } from "../../StatesEnum";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import CaretDown from "../../icons/Outline/Interface/Caret_down.svg";

const Wrapper = styled.form``;
const Content = styled(Row)`
  cursor: pointer;
`;

const SErrorMessage = styled.div<{ color: string }>`
  color: ${(props) => props.color};
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
  font-weight: 300;
  font-family: "Roboto";
  font-size: 18px;
`;

const SArrow = styled(Column)`
  height: 20px;
  width: 16px;
  margin-left: 10px;
`;

const SImage = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
  min-width: 25px;
  height: 25px;
`;

export type Props = {
  value?: string;
  id?: string;
  size?: string | InputSizes;
  type?: string;
  icon?: string;
  minValue?: number;
  maxValue?: number;
  iconPosition?: IconPosition;
  variant?: InputVariants;
  disabled?: boolean;
  label?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
  placeholder?: string;
};

const Input = ({
  value = "",
  size = InputSizes.MEDIUM,
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
  variant = InputVariants.COMMON,
  placeholder,
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
    if (
      minValue &&
      +valueState + delta >= minValue &&
      maxValue &&
      +valueState + delta <= maxValue
    ) {
      setValueState((+valueState + delta).toString());
    }
  };

  const changeHandler = (inputValue: string) => {
    if (type === "number") {
      if (maxValue && maxValue < +inputValue) {
        setValueState(maxValue.toString());
        return;
      }
      if (minValue && minValue > +inputValue) {
        setValueState(minValue.toString());
        return;
      }
      if (
        minValue &&
        maxValue &&
        +inputValue >= minValue &&
        +inputValue <= maxValue
      ) {
        setValueState(inputValue);
        return;
      }
      if (
        minValue &&
        +inputValue >= minValue &&
        maxValue &&
        +inputValue <= maxValue
      ) {
        setValueState(inputValue);
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

  return (
    <Wrapper>
      <label htmlFor={id}>
        <Column>
          <Content container justifyContent="start">
            {label}
          </Content>
          <Content container justifyContent="start">
            <InputWrapper
              padding={size}
              border={variant === InputVariants.COMMON ? borderStyle() : ""}
              borderBottom={
                variant === InputVariants.OUTLINED ? borderStyle() : ""
              }
            >
              <Content container alignItems="center">
                <>
                  {!!icon && IconPosition.LEFT === iconPosition && (
                    <SImage margin="0px 10px 0px 0px">
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
                    placeholder={placeholder}
                    {...props}
                  />
                  {type === "number" && (
                    <SArrow justifyContent="center">
                      <Image
                        onClick={() => changeValue(1)}
                        src={CaretUp as any}
                        width="10px"
                        height="10px"
                        alt="arrow"
                      />
                      <Image
                        onClick={() => changeValue(-1)}
                        src={CaretDown as any}
                        width="10px"
                        height="10px"
                        alt="arrow"
                      />
                    </SArrow>
                  )}
                  {!!icon && IconPosition.RIGHT === iconPosition && (
                    <SImage margin="0px 0px 0px 10px">
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
          <Content justifyContent="start">
            <SErrorMessage color={errorMessage ? "#BE0000" : "black"}>
              {errorMessage || hint}
            </SErrorMessage>
          </Content>
        </Column>
      </label>
    </Wrapper>
  );
};

export default React.memo(Input);
