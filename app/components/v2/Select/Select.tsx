import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select as JoySelect,
  SelectProps as JoySelectProps,
} from "@mui/joy";

export interface SelectProps {
  label?: string;
  hint?: string;
}

const Select = React.forwardRef(
  (
    {
      label,
      hint,
      children,
      ...props
    }: Omit<JoySelectProps<string | number | boolean>, keyof SelectProps> &
      SelectProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <JoySelect ref={ref} {...props}>
        {children}
      </JoySelect>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  )
);

export default React.memo(Select);
