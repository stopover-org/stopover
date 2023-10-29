import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select as JoySelect,
  SelectProps as JoySelectProps,
  Typography,
} from "@mui/joy";
import { FieldError } from "react-hook-form";

export interface SelectProps {
  label?: string;
  hint?: string | number | boolean | null;
  error?: FieldError;
  onChange?: (
    value: any,
    event?: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null
  ) => void;
}

const Select = React.forwardRef(
  (
    {
      label,
      hint,
      error,
      onChange,
      children,
      ...props
    }: Omit<JoySelectProps<string | number | boolean>, keyof SelectProps> &
      SelectProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const onChangeHandler = (
      event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: string | number | boolean | null
    ) => {
      if (!(onChange instanceof Function)) return;
      onChange(value, event);
    };
    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <JoySelect ref={ref} onChange={onChangeHandler} {...props}>
          {children}
        </JoySelect>
        {hint && <FormHelperText>{hint}</FormHelperText>}
        {error && (
          <FormHelperText>
            <Typography fontSize="sm" color="danger">
              {error.message}
            </Typography>
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default React.memo(Select);
