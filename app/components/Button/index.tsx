import React from "react";
import styled from "styled-components";
import {
  ButtonVariants,
  ButtonIconPlace,
  ButtonSizes,
} from "../Typography/StatesEnum";

const Wrapper = styled.div``;

const ButtonStyle = styled.button<{
  backgroundColor: string;
  border: string;
  padding: string;
}>`
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor};
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
  variant: ButtonVariants;
  iconPosition: ButtonIconPlace;
  color?: string;
  size?: ButtonSizes;
  disabled: boolean;
};

const Index = ({
  iconPosition,
  variant,
  children,
  disabled,
  color = "#FF8A00",
  size = ButtonSizes.VERY_SMALL,
  ...props
}: Props) => (
  <Wrapper>
    <ButtonStyle
      {...props}
      backgroundColor={
        variant === ButtonVariants.COMMON ? color : "transparent"
      }
      border={variant === ButtonVariants.OUTLINED ? color : "transparent"}
      padding={size.toString()}
    >
      <Content>{children}</Content>
    </ButtonStyle>
  </Wrapper>
);

export default Index;
