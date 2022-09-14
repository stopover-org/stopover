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
  cursor: string;
}>`
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.border};
  padding: ${(props) => props.padding};
  cursor: ${(props) => props.cursor};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

type Props = {
  children: React.ReactElement;
  icon: React.ReactElement; // TODO i do have to have icon
  variant: ButtonVariants;
  iconPosition: ButtonIconPlace;
  color?: string;
  size: ButtonSizes;
  disabled?: boolean;
};

const getContent = (
  iconPosition: Props["iconPosition"],
  children: Props["children"],
  icon: Props["icon"]
) => {
  if (iconPosition === ButtonIconPlace.WITH_LEFT_ICON) {
    return (
      <Content>
        {icon}
        {children}
      </Content>
    );
  }
  if (iconPosition === ButtonIconPlace.WITH_RIGHT_ICON) {
    return (
      <Content>
        {children}
        {icon}
      </Content>
    );
  }
  return null;
};

const Button = ({
  iconPosition,
  variant,
  children,
  icon,
  disabled,
  color = "#FF8A00",
  size = ButtonSizes.VERY_SMALL,
  ...props
}: Props) => {
  const shownColor = ((disabled && "grey") || color).toString();

  return (
    <Wrapper>
      <ButtonStyle
        {...props}
        backgroundColor={
          variant === ButtonVariants.COMMON ? shownColor : "transparent"
        }
        border={
          variant === ButtonVariants.OUTLINED ? shownColor : "transparent"
        }
        padding={size.toString()}
        cursor={disabled ? "auto" : "pointer"}
        disabled={disabled}
      >
        {getContent(iconPosition, React.Children.only(children), icon)}
      </ButtonStyle>
    </Wrapper>
  );
};

export default Button;
