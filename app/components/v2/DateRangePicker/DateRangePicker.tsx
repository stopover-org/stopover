import * as React from "react";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Moment } from "moment/moment";
import DatePicker from "../DatePicker";
import { DatePickerProps } from "../DatePicker/DatePicker";

interface DayPickerProps extends PickersDayProps<Moment> {
  selectedDays: Array<Moment | null>;
}

const DayPicker = ({ day, selectedDays, ...props }: DayPickerProps) => {
  const isIntermediarySelected =
    selectedDays.filter(Boolean).length === 2
      ? day.isBetween(selectedDays[0], selectedDays[1], "day")
      : false;
  return (
    <PickersDay
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

const DateRangePicker = (props: DatePickerProps) => {
  const [selectedDays, setSelectedDays] = React.useState<Array<Moment | null>>([
    null,
    null,
  ]);

  return (
    <DatePicker
      {...props}
      onChange={(date: Moment | null) => {
        let newSelectedDates = [...selectedDays];
        if (date && date.isValid()) {
          if (
            !newSelectedDates[0] ||
            newSelectedDates.filter(Boolean).length === 2
          ) {
            newSelectedDates = [date, null];
          } else {
            newSelectedDates = [selectedDays[0], date];
          }

          setSelectedDays(
            newSelectedDates.sort((a, b) => {
              if (!a || !b) return 0;
              return a.isSameOrAfter(b) ? 1 : -1;
            })
          );
        }
      }}
      slots={{
        // eslint-disable-next-line react/no-unstable-nested-components
        day: (dayProps: PickersDayProps<Moment>) => (
          <DayPicker {...dayProps} selectedDays={selectedDays} />
        ),
      }}
    />
  );
};
export default React.memo(DateRangePicker);
