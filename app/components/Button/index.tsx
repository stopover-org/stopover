import React from "react";
import styled from "styled-components";
import { ButtonVariants, ButtonIconPlace, ButtonSizes } from "../StatesEnum";

const Wrapper = styled.div``;
const ButtonStyle = styled.button<{
  backgroundColor: string;
  color: string;
  border: string;
  padding: string;
  cursor: string;
  borderRadius: string;
}>`
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color || "#000000"};
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
  children: React.ReactNode;
  icon?: React.ReactElement; // TODO i do have to have icon
  variant?: ButtonVariants;
  iconPosition?: ButtonIconPlace;
  color?: string;
  backgroundColor?: string;
  size?: ButtonSizes;
  disabled?: boolean;
  borderRadius?: string;
};

const getContent = (
  iconPosition: Props["iconPosition"],
  children: Props["children"],
  icon: Props["icon"]
) => {
  if (!icon) {
    return <Content>{children}</Content>;
  }
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
  iconPosition = ButtonIconPlace.WITH_LEFT_ICON,
  variant = ButtonVariants.COMMON,
  children,
  icon,
  disabled,
  backgroundColor = "#FF8A00",
  color = "#FFFFFF",
  size = ButtonSizes.BIG,
  borderRadius = "3px",
  ...props
}: Props) => {
  const shownColor = (disabled && "grey") || backgroundColor;

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
        color={color}
        padding={size.toString()}
        cursor={disabled ? "auto" : "pointer"}
        disabled={disabled}
        borderRadius={borderRadius}
      >
        {getContent(iconPosition, children, icon)}
      </ButtonStyle>
    </Wrapper>
  );
};

export default Button;
