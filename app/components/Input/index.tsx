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

const InputWrapper = styled.div<{ padding: string; border: string }>`
  border-radius: 1px;
  padding: ${(props) => props.padding};
  width: 100%;
  border: ${(props) => props.border};
  font-weight: 400;
  font-family: "Roboto";
  font-size: 18px;
`;

const SInput = styled.input`
  width: 100%;
`;
const SImage = styled(Image)``;

type Props = {
  value?: string;
  size?: string;
  icon?: string;
  iconPosition?: IconPosition;
  inputVariants?: InputVariants;
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
  icon,
  iconPosition = IconPosition.LEFT,
  inputVariants = InputVariants.COMMON,
  ...props
}: Props) => {
  const [valueState, setValueState] = useState<string>(value);
  const changeHandler = (inputValue: string) => {
    setValueState(inputValue);
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
              border={errorMessage ? "1px solid #BE0000" : "1px solid black"}
            >
              <Content>
                <>
                  {!!icon && IconPosition.LEFT === iconPosition && (
                    <SImage
                      src={icon}
                      width="25px"
                      height="25px"
                      alt="mag glass"
                    />
                  )}
                  <SInput
                    id="input"
                    onChange={(e) => changeHandler(e.target.value)}
                    value={valueState}
                    {...props}
                  />
                  {!!icon && IconPosition.RIGHT === iconPosition && (
                    <SImage
                      src={icon}
                      width="25px"
                      height="25px"
                      alt="mag glass"
                    />
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
