import React from "react";
import { Button as JoyButton, ButtonProps as JoyButtonProps } from "@mui/joy";

const Button = React.forwardRef(
  (props: JoyButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <JoyButton ref={ref} {...props} />
  )
);

export default React.memo(Button);
