import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Column from "../Column";
import Row from "../Row";
import { IconPosition, InputVariants } from "../StatesEnum";

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

const SImage = styled.div<{ padding: string }>`
  padding: ${(props) => props.padding};
`;

type Props = {
  value?: string;
  size?: string;
  icon?: string;
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
  label = "",
  hint = "",
  errorMessage = "",
  disabled,
  icon,
  iconPosition = IconPosition.LEFT,
  inputVariants = InputVariants.COMMON,
  ...props
}: Props) => {
  const [valueState, setValueState] = useState<string>(value);
  const changeHandler = (inputValue: string) => {
    setValueState(inputValue);
  };

  const borderStyle = () => {
    if (disabled) return "1px solid #797979";
    if (errorMessage) return "1px solid #BE0000";
    return "1px solid black";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(inputVariants);
  return (
    <Wrapper>
      <label htmlFor="input">
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
                    id="input"
                    onChange={(e) => changeHandler(e.target.value)}
                    value={valueState}
                    disabled={disabled}
                    {...props}
                  />
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

export default Input;
