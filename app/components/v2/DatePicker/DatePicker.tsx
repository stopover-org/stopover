import * as React from "react";
import {
  DatePicker as JoyDatePicker,
  DatePickerProps as JoyDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { PickersDayProps as JoyPickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Moment } from "moment";
import { FormControl } from "@mui/joy";
import { DatePickerSlotsComponentsProps } from "@mui/x-date-pickers/DatePicker/DatePicker.types";
import { FieldError } from "react-hook-form";
import DatePickerField from "./DatePickerField";
import { DatePickerInputFieldProps } from "./DatePickerInputField";
import PickersDay from "./PickersDay";

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
  error?: FieldError | string;
  slotProps?: DatePickerSlotProps;
  availableDates?: Moment[];
  highlightedDates?: Moment[];
}

export interface DatePickerProps
  extends Omit<JoyDatePickerProps<Moment>, keyof BaseDatePickerProps>,
    BaseDatePickerProps {}

const DatePicker = ({
  label,
  error,
  hint,
  availableDates,
  highlightedDates = [],
  ...props
}: DatePickerProps) => {
  const disableable = React.useMemo(
    () => typeof availableDates !== "undefined",
    [availableDates]
  );

  return (
    <FormControl sx={{ padding: 0 }}>
      <JoyDatePicker
        {...props}
        slots={{
          field: DatePickerField,
          // eslint-disable-next-line react/no-unstable-nested-components
          day: (dayProps: JoyPickersDayProps<Moment>) => (
            <PickersDay
              {...dayProps}
              sx={{ borderRadius: 0 }}
              disabled={
                disableable
                  ? !availableDates?.find((d) => d.isSame(dayProps.day, "day"))
                  : false
              }
              highlighted={
                !!highlightedDates?.find((d) => d.isSame(dayProps.day, "day"))
              }
            />
          ),
          ...props.slots,
        }}
        slotProps={{
          field: {
            label,
            hint,
            error,
            fullWidth: true,
            ...props.slotProps?.field,
          } as any,
          ...props.slotProps,
        }}
      />
    </FormControl>
  );
};

export default React.memo(DatePicker);
