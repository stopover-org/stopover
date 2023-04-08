import * as React from "react";
import { PickersDayProps } from "@mui/x-date-pickers";
import { Moment } from "moment/moment";
import { FormControl, Grid } from "@mui/joy";
import { ClickAwayListener } from "@mui/base";
import DatePicker from "../DatePicker";
import { DatePickerProps as OriginDatePickerProps } from "../DatePicker/DatePicker";
import Input from "../Input/Input";
import { getDate } from "../../../lib/utils/dates";
import PickersDay from "./PickersDay";

interface BaseDatePickerProps {
  onChange?: (dates: [Moment | null, Moment | null]) => void;
}

export interface DatePickerProps
  extends Omit<OriginDatePickerProps, keyof BaseDatePickerProps>,
    BaseDatePickerProps {}

const DateRangePicker = ({ onChange, onClose, ...props }: DatePickerProps) => {
  const formControlRef = React.useRef<HTMLDivElement>(null);
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [selectedDates, setSelectedDays] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);

  const onPickerClose = React.useCallback(() => {
    if (pickerVisible && selectedDates.filter(Boolean).length === 2) {
      setPickerVisible(false);
    }
  }, [pickerVisible, selectedDates, setPickerVisible]);

  React.useEffect(() => {
    if (onChange instanceof Function) {
      onChange(selectedDates);
    }

    onPickerClose();
  }, [selectedDates]);

  const onInputClick = React.useCallback(() => {
    if (!pickerVisible) {
      setPickerVisible(true);
      return;
    }

    setPickerVisible(false);
  }, [pickerVisible, setPickerVisible]);

  const onPickerChange = React.useCallback(
    async (date: Moment | null) => {
      let newSelectedDates: typeof selectedDates = [...selectedDates];
      if (date && date.isValid()) {
        if (
          !newSelectedDates[0] ||
          newSelectedDates.filter(Boolean).length === 2
        ) {
          newSelectedDates = [date, null];
        } else {
          newSelectedDates = [selectedDates[0], date];
        }

        await setSelectedDays(
          newSelectedDates.sort((a, b) => {
            if (!a || !b) return 0;
            return a.isSameOrAfter(b) ? 1 : -1;
          })
        );
      }
    },
    [selectedDates]
  );

  return (
    <ClickAwayListener
      onClickAway={() => {
        setPickerVisible(false);
      }}
    >
      <Grid xs={12} container>
        <Grid xs={6}>
          <Input
            value={getDate(selectedDates[0])}
            onChange={() => {}}
            onClick={onInputClick}
            readOnly
          />
        </Grid>
        <Grid xs={6}>
          <Input
            value={getDate(selectedDates[1])}
            onChange={() => {}}
            onClick={onInputClick}
            readOnly
          />
        </Grid>
        <Grid xs={12}>
          <FormControl ref={formControlRef}>
            <DatePicker
              {...props}
              open={pickerVisible}
              onChange={onPickerChange}
              slots={{
                // eslint-disable-next-line react/no-unstable-nested-components
                day: (dayProps: PickersDayProps<Moment>) => (
                  <PickersDay {...dayProps} selectedDays={selectedDates} />
                ),
                field: () => null,
                textField: () => null,
              }}
              slotProps={{
                popper: {
                  anchorEl: formControlRef.current,
                },
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
};
export default React.memo(DateRangePicker);
