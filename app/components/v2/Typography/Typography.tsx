import {
  Typography as JoyTypography,
  TypographyProps as JoyTypographyProps,
  styled,
} from "@mui/joy";
import React from "react";

const UnderlineStyle = styled("span")(() => ({
  textDecoration: "underline",
}));

const StrikeThroughStyle = styled("span")(() => ({
  textDecoration: "line-through",
}));

export interface TypographyProps {
  underline?: boolean;
  strikeThrough?: boolean;
}
const Typography = ({
  underline,
  strikeThrough,
  children,
  ...props
}: Omit<JoyTypographyProps, keyof TypographyProps> & TypographyProps) => {
  if (underline) {
    children = <UnderlineStyle>{children}</UnderlineStyle>;
  }
  if (strikeThrough) {
    children = <StrikeThroughStyle>{children}</StrikeThroughStyle>;
  }
  return <JoyTypography {...props}>{children}</JoyTypography>;
};

export default React.memo(Typography);
