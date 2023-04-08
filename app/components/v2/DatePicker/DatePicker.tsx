import * as React from "react";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MaterialDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { Moment } from "moment";
import { FormControl } from "@mui/joy";
import { DatePickerSlotsComponentsProps } from "@mui/x-date-pickers/DatePicker/DatePicker.types";
import DatePickerField from "./DatePickerField";
import { DatePickerInputFieldProps } from "./DatePickerInputField";

interface BaseDatePickerSlotProps {
  field?: Partial<DatePickerInputFieldProps>;
}

interface DatePickerSlotProps
  extends Omit<
      DatePickerSlotsComponentsProps<Moment>,
      keyof BaseDatePickerSlotProps
    >,
    BaseDatePickerSlotProps {}

interface BaseDatePickerProps {
  hint?: string;
  error?: string;
  slotProps?: DatePickerSlotProps;
}

export interface DatePickerProps
  extends Omit<MaterialDatePickerProps<Moment>, keyof BaseDatePickerProps>,
    BaseDatePickerProps {}

const DatePicker = ({ label, error, hint, ...props }: DatePickerProps) => (
  <FormControl>
    <MuiDatePicker
      {...props}
      slots={{ field: DatePickerField, ...props.slots }}
      slotProps={{
        field: {
          label,
          hint,
          error,
          fullWidth: true,
          formControlSx: {
            flexDirection: "row",
          },
          ...props.slotProps?.field,
        } as any,
        ...props.slotProps,
      }}
    />
  </FormControl>
);

export default React.memo(DatePicker);
