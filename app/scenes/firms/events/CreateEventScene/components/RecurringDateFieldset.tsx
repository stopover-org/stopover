import {
  Grid,
  Option,
  Stack,
  IconButton,
  FormHelperText,
  FormLabel,
  FormControl,
} from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Fieldset from "../../../../../components/v2/Fieldset/Fieldset";
import Typography from "../../../../../components/v2/Typography/Typography";
import Select from "../../../../../components/v2/Select/Select";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import Button from "../../../../../components/v2/Button";
import { CreateEventFields } from "../useCreateEventForm";

const RecurringDateFieldset = () => {
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);
  const form = useFormContext<CreateEventFields>();
  const recurringDatesField =
    form.useFormField<CreateEventFields["recurringDates"]>(`recurringDates`);
  const durationTimeField = form.useFormField("durationTime");
  const onDateChange = React.useCallback(
    <ValueType extends string | number>(
      value: ValueType,
      index: number,
      field: string
    ) => {
      recurringDatesField.onChange([
        ...recurringDatesField.value.slice(0, index),
        {
          ...recurringDatesField.value[index],
          [field]: value,
        },
        ...recurringDatesField.value.slice(
          index + 1,
          recurringDatesField.value.length
        ),
      ]);
    },
    [recurringDatesField]
  );

  const onDurationTimeChange = React.useCallback(
    (value: string, index: string) => {
      let time = ["0h", "0m"];
      if (durationTimeField.value) {
        time = durationTimeField.value.split(" ");
      }
      if (index === "h") time[0] = value + index;
      if (index === "m") time[1] = value + index;
      durationTimeField.onChange(`${time[0]} ${time[1]}`);
    },
    [durationTimeField]
  );

  const addHandler = React.useCallback(() => {
    recurringDatesField.onChange([
      ...recurringDatesField.value,
      { day: null, hour: null, minute: null },
    ]);
  }, [recurringDatesField.value, recurringDatesField.onChange]);

  const removeRow = React.useCallback(
    (index: number) => {
      recurringDatesField.onChange([
        ...recurringDatesField.value.slice(0, index),
        ...recurringDatesField.value.slice(index + 1),
      ]);
    },
    [recurringDatesField.value, recurringDatesField.onChange]
  );

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={4}>
          <Typography level="h3">Time</Typography>
        </Grid>
        <Grid xs={4}>
          <Select
            label="Hours"
            onChange={(value) => {
              onDurationTimeChange(value as string, "h");
            }}
            error={form.useFormField("durationTime").error}
          >
            {hours.map((hour) => (
              <Option key={hour} value={hour}>
                {hour.toString().padStart(2, "0")}
              </Option>
            ))}
          </Select>
        </Grid>
        <Grid xs={4}>
          <Select
            label="Minutes"
            onChange={(value) => {
              onDurationTimeChange(value as string, "m");
            }}
            error={form.useFormField("durationTime").error}
          >
            {minutes.map((minute) => (
              <Option key={minute} value={minute}>
                {minute.toString().padStart(2, "0")}
              </Option>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid>
        <Button size="sm" onClick={addHandler}>
          Add new recurring date
        </Button>
      </Grid>

      {recurringDatesField.value.map((date: any, index: number) => (
        <Grid xs={12} container key={index}>
          <Grid xs={2}>
            <Select
              label="Hours"
              onChange={(value) => {
                onDateChange<number>(value as number, index, "hour");
              }}
              error={form.formState.errors?.recurringDates?.[index]?.hour}
            >
              {hours.map((hour) => (
                <Option key={hour} value={hour}>
                  {hour.toString().padStart(2, "0")}
                </Option>
              ))}
            </Select>
          </Grid>
          <Grid xs={2}>
            <Select
              label="Minutes"
              onChange={(value) => {
                onDateChange<number>(value as number, index, "minute");
              }}
              error={form.formState.errors?.recurringDates?.[index]?.minute}
            >
              {minutes.map((minute) => (
                <Option key={minute} value={minute}>
                  {minute.toString().padStart(2, "0")}
                </Option>
              ))}
            </Select>
          </Grid>

          <Grid xs={7}>
            <FormControl>
              <FormLabel>Weekday</FormLabel>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday ",
                  "Sunday",
                ].map((day) => (
                  <Typography
                    key={day}
                    color="primary"
                    variant={date.day === day ? `solid` : `soft`}
                    onClick={() => {
                      onDateChange<string>(day as string, index, "day");
                    }}
                  >
                    {day}
                  </Typography>
                ))}
              </Stack>
            </FormControl>
            {!!form.formState.errors?.recurringDates?.[index]?.day && (
              <FormHelperText>
                <Typography color="danger" fontSize="sm">
                  Required
                </Typography>
              </FormHelperText>
            )}
          </Grid>

          <Grid xs={1}>
            <Stack
              justifyContent="flex-start"
              alignItems="flex-end"
              height="100%"
              sx={{ paddingTop: "2em" }}
            >
              <IconButton
                size="sm"
                color="danger"
                onClick={() => {
                  removeRow(index);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Fieldset>
  );
};

export default React.memo(RecurringDateFieldset);
