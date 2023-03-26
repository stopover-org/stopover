import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import Image from "next/image";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";
import { IconPosition, InputSizes, InputVariants } from "../../StatesEnum";
import BaseInput from "../BaseInput";
import { Omit } from "../../../lib/types";

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

const SImage = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
  min-width: 25px;
  height: 25px;
`;

export type InputProps = {
  error?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  icon?: string;
  iconPosition?: IconPosition;
  label?: string | React.ReactElement;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: string) => void;
  size?: string | InputSizes;
  value: string;
  variant?: InputVariants;
};

const Input = React.forwardRef(
  ({
    error = "",
    hint = "",
    icon,
    iconPosition = IconPosition.LEFT,
    label = "",
    maxValue,
    minValue,
    onChange,
    size = InputSizes.MEDIUM,
    value,
    variant = InputVariants.COMMON,
    ...props
  }: Omit<React.HTMLProps<HTMLInputElement>, keyof InputProps> &
    InputProps) => {
    const changeHandler = (val: string) => {
      if (!onChange) return;
      if (props.type === "number") {
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

    const borderStyle = () => {
      if (props.disabled) return "1px solid #797979";
      if (error) return "1px solid #BE0000";
      return "1px solid black";
    };

    return (
      <label htmlFor={props.id}>
        <Column>
          <Content container justifyContent="start">
            {label}
          </Content>
          <Content padding="0px" container justifyContent="start">
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
                  <BaseInput
                    {...props}
                    onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                      changeHandler((e.target as HTMLInputElement).value)
                    }
                  />
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
            <SErrorMessage color={error ? "#BE0000" : "black"}>
              {error || hint}
            </SErrorMessage>
          </Content>
        </Column>
      </label>
    );
  }
);

export default React.memo(Input);
