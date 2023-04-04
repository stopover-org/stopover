import {
  Input as JoyInput,
  FormHelperText,
  FormLabel,
  InputProps as JoyInputProps,
  Typography,
} from "@mui/joy";
import React from "react";

export interface InputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
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
      <>
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
      </>
    );
  }
);

export default React.memo(Input);
