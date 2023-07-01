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
import Fieldset from "../../../v2/Fieldset/Fieldset";
import Typography from "../../../v2/Typography/Typography";
import Select from "../../../v2/Select/Select";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Button from "../../../v2/Button";
import { CreateEventFields } from "../../../../scenes/firms/events/CreateEventScene/useCreateEventForm";

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
    <>
      <Fieldset>
        <Grid xs={12} container>
          <Grid xs={6}>
            <Typography level="h3">Event will take (duration time)</Typography>
          </Grid>
        </Grid>
        <Grid xs={12} container>
          <Grid xs={2}>
            <Select
              label="Hours"
              onChange={(value) => {
                onDurationTimeChange(value as string, "h");
              }}
              value={parseInt(durationTimeField.value.split(" ")[0], 10)}
              error={durationTimeField.error}
            >
              {hours.map((hour) => (
                <Option key={hour} value={hour}>
                  {hour.toString()} hours
                </Option>
              ))}
            </Select>
          </Grid>
          <Grid xs={2}>
            <Select
              label="Minutes"
              onChange={(value) => {
                onDurationTimeChange(value as string, "m");
              }}
              value={parseInt(durationTimeField.value.split(" ")[1], 10)}
              error={durationTimeField.error}
            >
              {minutes.map((minute) => (
                <Option key={minute} value={minute}>
                  {minute.toString()} minutes
                </Option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12} container>
          <Button size="sm" onClick={addHandler}>
            Add new recurring date
          </Button>
        </Grid>

        {recurringDatesField.value.map(
          ({ day, hour, minute }, index: number) => (
            <Grid xs={12} container key={index}>
              <Grid xs={4}>
                <FormControl>
                  <FormLabel>Recurring event starts at</FormLabel>
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
                    ].map((d) => (
                      <Typography
                        key={d}
                        color="primary"
                        variant={day === d ? `solid` : `soft`}
                        onClick={() => {
                          onDateChange<string>(d as string, index, "day");
                        }}
                      >
                        {d}
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
              <Grid xs={2}>
                <Select
                  label="Time (hour)"
                  onChange={(value) => {
                    onDateChange<number>(value as number, index, "hour");
                  }}
                  error={form.formState.errors?.recurringDates?.[index]?.hour}
                  value={hour}
                >
                  {hours.map((h) => (
                    <Option key={h} value={h}>
                      {h.toString().padStart(2, "0")} h
                    </Option>
                  ))}
                </Select>
              </Grid>
              <Grid>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  height="100%"
                  sx={{ paddingTop: "25px" }}
                >
                  <Typography level="h4">&nbsp;:&nbsp;</Typography>
                </Stack>
              </Grid>
              <Grid xs={2}>
                <Select
                  label="Time (minute)"
                  onChange={(value) => {
                    onDateChange<number>(value as number, index, "minute");
                  }}
                  error={form.formState.errors?.recurringDates?.[index]?.minute}
                  value={minute}
                >
                  {minutes.map((m) => (
                    <Option key={m} value={m}>
                      {m.toString().padStart(2, "0")} m
                    </Option>
                  ))}
                </Select>
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
          )
        )}
      </Fieldset>
    </>
  );
};

export default React.memo(RecurringDateFieldset);
