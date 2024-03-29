import * as React from "react";
import { PickersDayProps } from "@mui/x-date-pickers";
import { Moment } from "moment/moment";
import { FormControl, FormLabel, Grid, IconButton, Tooltip } from "@mui/joy";
import { ClickAwayListener } from "@mui/base";
import ClearIcon from "@mui/icons-material/Clear";
import { getDate } from "lib/utils/dates";
import DatePicker from "components/v2/DatePicker";
import { DatePickerProps as JoyDatePickerProps } from "components/v2/DatePicker/DatePicker";
import Input, { InputProps } from "components/v2/Input/Input";
import PickersDay from "./PickersDay";

interface BaseDatePickerProps {
  onChange?: (dates: [Moment | null, Moment | null]) => void;
  startInputProps?: Partial<InputProps>;
  endInputProps?: Partial<InputProps>;
  value: [Moment | null, Moment | null];
  availableDates?: Moment[];
  clearStyles?: any;
}

export interface DatePickerProps
  extends Omit<JoyDatePickerProps, keyof BaseDatePickerProps>,
    BaseDatePickerProps {}

const DateRangePicker = ({
  onChange,
  onClose,
  startInputProps = {},
  endInputProps = {},
  availableDates,
  value,
  clearStyles = {},
  label,
  ...props
}: DatePickerProps) => {
  const formControlRef = React.useRef<HTMLDivElement>(null);
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [selectedDates, setSelectedDays] = React.useState<
    [Moment | null, Moment | null]
  >(value || [null, null]);

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

        setSelectedDays(
          newSelectedDates.sort((a, b) => {
            if (!a || !b) return 0;
            return a.isSameOrAfter(b) ? 1 : -1;
          })
        );
      }
    },
    [selectedDates]
  );

  const disableable = React.useMemo(
    () => typeof availableDates !== "undefined",
    [availableDates]
  );

  return (
    <ClickAwayListener
      onClickAway={() => {
        setPickerVisible(false);
      }}
    >
      <Grid xs={12} container spacing={1}>
        {label && (
          <Grid xs={12}>
            <FormLabel>{label}</FormLabel>
          </Grid>
        )}
        <Grid xs={5}>
          <Input
            value={getDate(selectedDates[0]) || ""}
            {...startInputProps}
            onChange={() => {}}
            onClick={onInputClick}
            readOnly
          />
        </Grid>
        <Grid xs={5}>
          <Input
            value={getDate(selectedDates[1]) || ""}
            {...endInputProps}
            onChange={() => {}}
            onClick={onInputClick}
            readOnly
          />
        </Grid>
        <Grid xs={2} sx={clearStyles}>
          <IconButton
            size="sm"
            onClick={() => {
              if (onChange instanceof Function) {
                onChange([null, null]);
              }

              setSelectedDays([null, null]);
            }}
          >
            <Tooltip title="Clear">
              <ClearIcon />
            </Tooltip>
          </IconButton>
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
                  <PickersDay
                    {...dayProps}
                    disabled={
                      disableable
                        ? !availableDates?.find((d) =>
                            d.isSame(dayProps.day, "day")
                          )
                        : false
                    }
                    selectedDays={selectedDates}
                  />
                ),
                field: () => null,
                textField: () => null,
                ...props.slots,
              }}
              slotProps={{
                popper: {
                  anchorEl: formControlRef.current,
                  ...props.slotProps?.popper,
                },
                ...props.slotProps,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
};
export default React.memo(DateRangePicker);
