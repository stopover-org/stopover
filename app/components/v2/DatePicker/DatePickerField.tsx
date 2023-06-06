import {
  unstable_useDateField as useDateField,
  UseDateFieldProps,
} from "@mui/x-date-pickers/DateField";
import { Moment } from "moment/moment";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers";
import * as React from "react";
import DatePickerInputField from "./DatePickerInputField";

interface DatePickerFieldProps
  extends UseDateFieldProps<Moment>,
    BaseSingleInputFieldProps<
      Moment | null,
      FieldSection,
      DateValidationError
    > {}

const DatePickerField = (props: DatePickerFieldProps) => {
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
    <DatePickerInputField
      {...response}
      error={undefined}
      onChange={(_, event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
          response.onChange(event);
        }
      }}
    />
  );
};

export default React.memo(DatePickerField);
