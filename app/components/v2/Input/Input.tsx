import {
  Input as JoyInput,
  FormHelperText,
  FormLabel,
  InputProps as JoyInputProps,
  Typography,
  Box,
} from "@mui/joy";
import React from "react";

export interface InputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
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
    ref: React.Ref<HTMLDivElement>
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value, event);
    };

    return (
      <Box ref={ref}>
        {label && <FormLabel>{label}</FormLabel>}
        <JoyInput
          onChange={onChangeHandler}
          value={value}
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
      </Box>
    );
  }
);

export default React.memo(Input);
