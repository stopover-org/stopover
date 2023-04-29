import React from "react";
import {
  DateCalendar as DateCalendarJoy,
  DateCalendarProps as DateCalendarJoyProps,
} from "@mui/x-date-pickers";
import { Moment } from "moment";
import {
  PickersDay as JoyPickersDay,
  PickersDayProps as JoyPickersDayProps,
} from "@mui/x-date-pickers/PickersDay";

interface BaseDateCalendarProps {
  availableDates?: Moment[];
}

interface DateCalendarProps
  extends Omit<DateCalendarJoyProps<Moment>, keyof BaseDateCalendarProps>,
    BaseDateCalendarProps {}

const DateCalendar = ({ availableDates, ...props }: DateCalendarProps) => {
  const disableable = React.useMemo(
    () => typeof availableDates !== "undefined",
    [availableDates]
  );
  return (
    <DateCalendarJoy
      slots={{
        // eslint-disable-next-line react/no-unstable-nested-components
        day: (dayProps: JoyPickersDayProps<Moment>) => (
          <JoyPickersDay
            {...dayProps}
            sx={{ borderRadius: 0 }}
            disabled={
              disableable
                ? !availableDates?.find((d) => d.isSame(dayProps.day, "day"))
                : false
            }
          />
        ),
      }}
      {...props}
    />
  );
};
export default React.memo(DateCalendar);
