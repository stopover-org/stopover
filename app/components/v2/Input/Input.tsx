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
  min?: any;
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
      min = 0,
      ...props
    }: InputProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: React.Ref<HTMLDivElement>
  ) => {
    const onChangeHandler = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!(onChange instanceof Function)) return;
        let inputValue: string | number = event.target.value;

        if (props.type === "number") {
          inputValue = parseInt(inputValue, 10);
          if (Number.isNaN(inputValue)) {
            inputValue = 0;
          }
        }

        if (typeof min === "number" && (inputValue as number) < min) {
          inputValue = min;
        }

        onChange(inputValue as string, event);
      },
      [onChange, value, min]
    );

    const errorMessage = React.useMemo(
      () => (typeof error === "string" ? error : error?.message),
      [error]
    );

    return (
      <FormControl sx={{ margin: 0, padding: 0 }}>
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
