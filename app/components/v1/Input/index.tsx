import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";
import { IconPosition, InputSizes, InputVariants } from "../../StatesEnum";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import CaretDown from "../../icons/Outline/Interface/Caret_down.svg";

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

export type InputProps = {
  disabled?: boolean;
  errorMessage?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  icon?: string;
  iconPosition?: IconPosition;
  id?: string;
  label?: string | React.ReactElement;
  maxValue?: number;
  minValue?: number;
  name: string;
  placeholder?: string;
  size?: string | InputSizes;
  type?: string;
  value: string;
  variant?: InputVariants;
  onChange: (value: string) => void;
};

const Input = React.forwardRef(
  ({
    disabled,
    errorMessage = "",
    hint = "",
    icon,
    iconPosition = IconPosition.LEFT,
    id,
    label = "",
    maxValue,
    minValue,
    name,
    onChange,
    placeholder,
    size = InputSizes.MEDIUM,
    type = "text",
    value,
    variant = InputVariants.COMMON,
    ...props
  }: InputProps) => {
    const changeHandler = (val: string) => {
      if (type === "number") {
        // validate max values
        if (maxValue && maxValue < +val) {
          onChange(maxValue.toString());
          return;
        }

        // validate min value
        if (minValue && minValue > +val) {
          onChange(minValue.toString());
          return;
        }
      }

      onChange(val);
    };

    const increaseValue = () => {
      changeHandler((+value + 1).toString());
    };

    const decreaseValue = () => {
      changeHandler((+value - 1).toString());
    };

    const borderStyle = () => {
      if (disabled) return "1px solid #797979";
      if (errorMessage) return "1px solid #BE0000";
      return "1px solid black";
    };

    return (
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
                    {...props}
                    id={id}
                    onChange={(e) => changeHandler(e.target.value)}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    name={name}
                  />
                  {type === "number" && (
                    <SArrow justifyContent="center">
                      <Image
                        onClick={increaseValue}
                        src={CaretUp as any}
                        width="10px"
                        height="10px"
                        alt="arrow"
                      />
                      <Image
                        onClick={decreaseValue}
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
    );
  }
);

export default React.memo(Input);
