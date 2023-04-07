import {
  Input as JoyInput,
  FormHelperText,
  FormLabel,
  InputProps as JoyInputProps,
  Typography,
  Grid,
} from "@mui/joy";
import React from "react";

interface BaseInputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface InputProps
  extends Omit<JoyInputProps, keyof BaseInputProps>,
    BaseInputProps {}

const Input = React.forwardRef(
  (
    { label, hint, error, onChange, value, ...props }: InputProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value, event);
    };

    return (
      <Grid ref={ref}>
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
      </Grid>
    );
  }
);

export default React.memo(Input);
