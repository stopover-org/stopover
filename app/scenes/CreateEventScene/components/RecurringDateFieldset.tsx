import { Grid, Option, Stack } from "@mui/joy";
import React from "react";
import Fieldset from "../../../components/v2/Fieldset/Fieldset";
import Typography from "../../../components/v2/Typography/Typography";
import Select from "../../../components/v2/Select/Select";
import useFormContext from "../../../lib/hooks/useFormContext";
import Button from "../../../components/v2/Button";
import Input from "../../../components/v2/Input/Input";

const RecurringDateFieldset = () => {
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);
  // TODO replace any with fields from useCreateEventForm
  const form = useFormContext<any>();
  const datesField = form.useFormField<any[]>(`dates`);
  const onDateChange = React.useCallback(
    <ValueType extends string | number>(
      value: ValueType,
      index: number,
      field: string
    ) => {
      datesField.onChange([
        ...datesField.value.slice(0, index),
        {
          ...datesField.value[index],
          [field]: value,
        },
        ...datesField.value.slice(index + 1, datesField.value.length),
      ]);
    },
    [datesField, hours, minutes]
  );

  const addHandler = () => {
    datesField.onChange([
      ...datesField.value,
      { day: null, hour: null, minute: null },
    ]);
  };

  const subHandler = (index: number) => {
    datesField.onChange([
      ...datesField.value.slice(0, index),
      ...datesField.value.slice(index + 1, datesField.value.length),
    ]);
  };

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={4}>
          <Typography level="h3">Time</Typography>
        </Grid>
        <Grid xs={4}>
          <Select defaultValue={0} label="Hours">
            {hours.map((hour) => (
              <Option key={hour} value={hour}>
                {hour}
              </Option>
            ))}
          </Select>
        </Grid>

        <Grid xs={4}>
          <Select defaultValue={0} label="Minutes">
            {minutes.map((minute) => (
              <Option key={minute} value={minute}>
                {minute}
              </Option>
            ))}
          </Select>
        </Grid>
      </Grid>

      {datesField.value.map((date: any, index: number) => (
        <React.Fragment key={index}>
          <Grid xs={12} container>
            <Grid xs={12}>
              <Stack justifyContent="flex-end" direction="row">
                <Button size="sm" onClick={addHandler}>
                  +
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    subHandler(index);
                  }}
                >
                  -
                </Button>
              </Stack>
            </Grid>
            <Grid xs={2}>
              <Select
                defaultValue={0}
                label="Hours"
                onChange={(_, value) => {
                  onDateChange<number>(value as number, index, "hour");
                }}
              >
                {hours.map((hour) => (
                  <Option key={hour} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
            </Grid>
            <Grid xs={2}>
              <Select
                defaultValue={0}
                label="Minutes"
                onChange={(_, value) => {
                  onDateChange<number>(value as number, index, "minute");
                }}
              >
                {minutes.map((minute) => (
                  <Option key={minute} value={minute}>
                    {minute}
                  </Option>
                ))}
              </Select>
            </Grid>

            <Grid xs={8}>
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
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </Fieldset>
  );
};

export default React.memo(RecurringDateFieldset);
