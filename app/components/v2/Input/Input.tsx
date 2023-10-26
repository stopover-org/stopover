import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input as JoyInput,
  InputProps as JoyInputProps,
  Tooltip,
  Typography,
} from "@mui/joy";
import React from "react";
import { FieldError } from "react-hook-form";

interface BaseInputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: FieldError | string;
  onChange?: (value: string, event?: React.ChangeEvent<any>) => void;
  value?: string;
  placeholder?: string;
  tooltip?: string;
  tooltipMark?: string;
}

export interface InputProps
  extends Omit<JoyInputProps, keyof BaseInputProps>,
    BaseInputProps {}

const Input = React.forwardRef(
  (
    {
      label,
      hint,
      error,
      onChange,
      value,
      tooltip,
      tooltipMark = "?",
      ...props
    }: InputProps,
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
          endDecorator={
            tooltip && (
              <Tooltip title={tooltip} sx={{ width: "300px" }}>
                <Typography
                  fontSize="10px"
                  variant="soft"
                  color="primary"
                  borderRadius="7px"
                  textAlign="center"
                  width="1.5em"
                  height="1.5em"
                  sx={{ cursor: "pointer" }}
                >
                  {tooltipMark}
                </Typography>
              </Tooltip>
            )
          }
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
