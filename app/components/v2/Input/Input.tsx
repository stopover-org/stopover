import {
  Input as JoyInput,
  FormControl,
  FormHelperText,
  FormLabel,
  InputProps as JoyInputProps,
  Typography,
} from "@mui/joy";
import React from "react";

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  onChange: (value: string) => void;
  value: string;
}

const Input = React.forwardRef(
  (
    {
      label,
      hint,
      error,
      onChange,
      value,
      ...props
    }: Omit<JoyInputProps, keyof InputProps> & InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <JoyInput
          onChange={onChangeHandler}
          value={value}
          ref={ref}
          error={Boolean(error)}
          {...props}
        />
        {hint && <FormHelperText>{hint}</FormHelperText>}
        {error && (
          <FormHelperText>
            <Typography fontSize="sm" color="danger">
              {error}
            </Typography>
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default React.memo(Input);
