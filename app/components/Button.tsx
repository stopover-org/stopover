import React from "react";
import styled from "styled-components";
import { ButtonVariants, ButtonIconPlace, ButtonSizes } from "./StatesEnum";

const Wrapper = styled.div``;
const ButtonStyle = styled.button<{
  backgrounColor: string;
  border: string;
  padding: string;
}>`
  border-radius: 3px;
  background-color: ${(props) => props.backgrounColor};
  border: 1px solid ${(props) => props.border};
  padding: ${(props) => props.padding};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  children: React.ReactElement;
  buttonVariant: ButtonVariants;
  buttonIconPlace: ButtonIconPlace;
  buttonColor?: string;
  buttonSize?: ButtonSizes;
  disabled: boolean;
};

const Button = ({
  buttonIconPlace,
  buttonVariant,
  children,
  disabled,
  buttonColor = "#FF8A00",
  buttonSize = ButtonSizes.VERY_SMALL,
  ...props
}: Props) => (
  <Wrapper>
    <ButtonStyle
      {...props}
      backgrounColor={
        buttonVariant === ButtonVariants.COMMON ? buttonColor : "transparent"
      }
      border={
        buttonVariant === ButtonVariants.OUTLINED ? buttonColor : "transparent"
      }
      padding={buttonSize.toString()}
    >
      <Content>{children}</Content>
    </ButtonStyle>
  </Wrapper>
);
export default Button;
