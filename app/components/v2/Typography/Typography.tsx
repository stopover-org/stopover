import {
  styled,
  Typography as JoyTypography,
  TypographyProps as JoyTypographyProps,
} from "@mui/joy";
import React from "react";

const UnderlineStyle = styled("span")(() => ({
  textDecoration: "underline",
}));

const StrikeThroughStyle = styled("span")(() => ({
  textDecoration: "line-through",
}));

interface BaseTypographyProps {
  underline?: boolean;
  strikeThrough?: boolean;
}

export interface TypographyProps
  extends Omit<JoyTypographyProps, keyof BaseTypographyProps>,
    BaseTypographyProps {}

const Typography = React.forwardRef(
  (
    { underline, strikeThrough, children, sx, ...props }: TypographyProps,
    ref: React.ForwardedRef<HTMLParagraphElement>
  ) => {
    if (underline) {
      children = <UnderlineStyle>{children}</UnderlineStyle>;
    }
    if (strikeThrough) {
      children = <StrikeThroughStyle>{children}</StrikeThroughStyle>;
    }
    return (
      <JoyTypography ref={ref} sx={sx} whiteSpace="pre-wrap" {...props}>
        {children}
      </JoyTypography>
    );
  }
);

export default React.memo(Typography);
