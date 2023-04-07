import * as React from "react";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MaterialDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import {
  unstable_useDateField as useDateField,
  UseDateFieldProps,
} from "@mui/x-date-pickers/DateField";
import { Moment } from "moment";
import { FormControl, InputProps as JoyInputProps } from "@mui/joy";
import Input from "../Input";
import { InputProps } from "../Input/Input";

interface InputFieldProps
  extends InputProps,
    Omit<JoyInputProps, keyof InputProps> {
  label?: React.ReactNode;
  InputProps?: {
    ref?: React.Ref<any>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  formControlSx?: JoyInputProps["sx"];
}

type JoyFieldComponent = ((
  props: InputFieldProps & React.RefAttributes<HTMLInputElement>
) => JSX.Element) & { propTypes?: any };

const Field = React.forwardRef(
  (props: InputFieldProps, inputRef: React.Ref<HTMLInputElement>) => {
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
        sx={{ ...formControlSx }}
        ref={containerRef}
      >
        <Input
          disabled={disabled}
          slotProps={{ input: { ref: inputRef } }}
          startDecorator={startAdornment}
          endDecorator={endAdornment}
          {...other}
        />
      </FormControl>
    );
  }
) as JoyFieldComponent;

export interface DatePickerProps extends UseDateFieldProps<Moment> {
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  slots: any;
  slotProps: any;
}
const DatePickerField = (props: DatePickerProps) => {
  const {
    inputRef: externalInputRef,
    slots,
    slotProps,
    ...textFieldProps
  } = props;

  const response = useDateField<Moment, typeof textFieldProps>({
    props: textFieldProps,
    inputRef: externalInputRef,
  });

  return (
    <Field
      {...response}
      onChange={(_, event: React.ChangeEvent<HTMLInputElement>) =>
        response.onChange(event)
      }
    />
  );
};

const DatePicker = ({
  label,
  error,
  hint,
  ...props
}: MaterialDatePickerProps<Moment> & { hint?: string; error?: string }) => (
  <FormControl>
    <MuiDatePicker
      {...props}
      slots={{ field: DatePickerField, ...props.slots }}
      slotProps={{
        field: {
          label,
          hint,
          error,
          formControlSx: {
            flexDirection: "row",
          },
        } as any,
      }}
    />
  </FormControl>
);

export default React.memo(DatePicker);
