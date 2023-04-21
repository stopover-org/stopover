import React from "react";
import { Button as JoyButton, ButtonProps as JoyButtonProps } from "@mui/joy";

interface BaseButtonProps {}

interface ButtonProps
  extends Omit<JoyButtonProps, keyof BaseButtonProps>,
    BaseButtonProps {}

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <JoyButton ref={ref} {...props} />
  )
);

export default React.memo(Button);
