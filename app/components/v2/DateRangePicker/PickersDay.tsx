import { Moment } from "moment";
import * as React from "react";
import {
  PickersDay as JoyPickersDay,
  PickersDayProps as JoyPickersDayProps,
} from "@mui/x-date-pickers/PickersDay";

interface BasePickersDayProps {
  selectedDays: [Moment | null, Moment | null];
}

interface PickersDayProps
  extends Omit<JoyPickersDayProps<Moment>, keyof BasePickersDayProps>,
    BasePickersDayProps {}

const PickersDay = ({ day, selectedDays, ...props }: PickersDayProps) => {
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
