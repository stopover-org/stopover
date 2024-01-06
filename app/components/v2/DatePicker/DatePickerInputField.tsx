import * as React from "react";
import { FormControl, InputProps as JoyInputProps } from "@mui/joy";
import Input, { InputProps } from "../Input/Input";

interface BaseDatePickerInputFieldProps {
  label?: React.ReactNode;
  InputProps?: {
    ref?: React.Ref<HTMLInputElement>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  formControlSx?: JoyInputProps["sx"];
  onChange: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface DatePickerInputFieldProps
  extends BaseDatePickerInputFieldProps,
    Omit<InputProps, keyof BaseDatePickerInputFieldProps> {}

type JoyFieldComponent = ((
  props: DatePickerInputFieldProps & React.RefAttributes<HTMLInputElement>
) => JSX.Element) & { propTypes?: any };

const DatePickerInputField = React.forwardRef(
  (props: DatePickerInputFieldProps, inputRef: React.Ref<HTMLInputElement>) => {
    const {
      disabled,
      id,
      InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
      formControlSx,
      ...other
    } = props;

    return (
      <FormControl
        disabled={disabled}
        id={id}
        sx={{ ...formControlSx, padding: 0 }}
        ref={containerRef}
      >
        <Input
          disabled={disabled}
          slotProps={{ input: { ref: inputRef } }}
          startDecorator={startAdornment}
          endDecorator={endAdornment}
          {...other}
          fullWidth
        />
      </FormControl>
    );
  }
) as JoyFieldComponent;

export default React.memo(DatePickerInputField);
