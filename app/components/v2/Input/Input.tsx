import {
  Input as JoyInput,
  FormHelperText,
  FormLabel,
  InputProps as JoyInputProps,
  Typography,
  FormControl,
} from "@mui/joy";
import React from "react";
import { FieldError } from "react-hook-form";

interface BaseInputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: FieldError | string;
  onChange?: (value: string, event?: React.SyntheticEvent<any>) => void;
  value?: string;
  placeholder?: string;
}

export interface InputProps
  extends Omit<JoyInputProps, keyof BaseInputProps>,
    BaseInputProps {}

const Input = React.forwardRef(
  (
    { label, hint, error, onChange, value, ...props }: InputProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: React.Ref<HTMLDivElement>
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!(onChange instanceof Function)) return;
      onChange(event.target.value, event);
    };

    const errorMessage = React.useMemo(
      () => (typeof error === "string" ? error : error?.message),
      [error]
    );

    return (
      <FormControl ref={ref}>
        {label && <FormLabel>{label}</FormLabel>}
        <JoyInput
          onChange={onChangeHandler}
          value={value}
          error={Boolean(error)}
          {...props}
          fullWidth
        />
        {hint && <FormHelperText>{hint}</FormHelperText>}
        {error && (
          <FormHelperText>
            <Typography fontSize="sm" color="danger">
              {errorMessage}
            </Typography>
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default React.memo(Input);
