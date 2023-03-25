import React from "react";
import styled from "styled-components";
import { ButtonIconPlace, ButtonSizes, ButtonVariants } from "../../StatesEnum";
import Row from "../../Layout/Row";

const IconPadding = styled.div<{ padding: string }>`
  padding: ${(props) => props.padding};
`;

const ButtonStyle = styled.button<{
  backgroundColor: string;
  color: string;
  border: string;
  padding: string;
  cursor: string;
  borderRadius: string;
}>`
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.border};
  padding: ${(props) => props.padding};
  cursor: ${(props) => props.cursor};
`;

export type Props = {
  children: React.ReactNode;
  icon?: React.ReactElement; // TODO i do have to have icon
  variant?: ButtonVariants;
  iconPosition?: ButtonIconPlace;
  color?: string;
  backgroundColor?: string;
  size?: ButtonSizes;
  disabled?: boolean;
  borderRadius?: string;
  className?: string;
  type?: "submit" | "button";
};

const getContent = (
  iconPosition: Props["iconPosition"],
  children: Props["children"],
  icon: Props["icon"]
) => {
  if (!icon) {
    return <Row>{children}</Row>;
  }
  if (iconPosition === ButtonIconPlace.WITH_LEFT_ICON) {
    return (
      <Row>
        <IconPadding padding="0px 10px 0px 0px">{icon}</IconPadding>
        {children}
      </Row>
    );
  }
  if (iconPosition === ButtonIconPlace.WITH_RIGHT_ICON) {
    return (
      <Row>
        {children}
        <IconPadding padding="0px 0px 0px 10px">{icon}</IconPadding>
      </Row>
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
  color = "black",
  size = ButtonSizes.BIG,
  borderRadius = "3px",
  className = "",
  type,
  ...props
}: Props) => {
  const shownColor = (disabled && "grey") || backgroundColor;

  return (
    <div className={className}>
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
        cursor={disabled ? "not-allowed" : "pointer"}
        disabled={disabled}
        borderRadius={borderRadius}
        type={type}
      >
        {getContent(iconPosition, children, icon)}
      </ButtonStyle>
    </div>
  );
};

export default Button;
