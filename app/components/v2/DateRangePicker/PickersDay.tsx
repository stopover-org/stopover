import { PickersDayProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import * as React from "react";
import { PickersDay as JoyPickersDay } from "@mui/x-date-pickers/PickersDay";

interface DayPickerProps extends PickersDayProps<Moment> {
  selectedDays: [Moment | null, Moment | null];
}

const PickersDay = ({ day, selectedDays, ...props }: DayPickerProps) => {
  const isIntermediarySelected = React.useMemo(
    () =>
      selectedDays.filter(Boolean).length === 2
        ? day.isBetween(selectedDays[0], selectedDays[1], "day")
        : false,
    [day, selectedDays]
  );

  return (
    <JoyPickersDay
      {...props}
      sx={(theme: any) =>
        isIntermediarySelected
          ? {
              borderTop: `2px dashed ${theme.palette.primary["300"]}`,
              borderBottom: `2px dashed ${theme.palette.primary["300"]}`,
              borderRadius: 0,
            }
          : { borderRadius: 0 }
      }
      day={day}
      selected={Boolean(
        selectedDays.filter(Boolean).find((d) => d?.isSame(day, "day"))
      )}
    />
  );
};

export default React.memo(PickersDay);
