import React from "react";
import { Grid, Option, Stack } from "@mui/joy";
import { Moment } from "moment/moment";
import Fieldset from "../../../../../components/v2/Fieldset";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../useCreateEventForm";
import DatePicker from "../../../../../components/v2/DatePicker/DatePicker";
import Select from "../../../../../components/v2/Select/Select";
import Typography from "../../../../../components/v2/Typography/Typography";

const EndDateFieldset = () => {
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);
  const form = useFormContext<CreateEventFields>();
  const endDate = form.useFormField<CreateEventFields["endDate"]>("endDate");
  const changeEndDate = (
    value: Moment | string | number | null,
    field: string
  ) => {
    endDate.onChange({
      ...endDate.value,
      [field]: value,
    });
  };

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={4}>
          <DatePicker
            label="One time event starts at"
            value={endDate.date}
            onChange={(newDate) => changeEndDate(newDate as Moment, "date")}
          />
        </Grid>

        <Grid xs={2}>
          <Select
            label="Time (hour)"
            onChange={(value) => {
              changeEndDate(value as number, "hour");
            }}
            value={endDate.hour}
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
              changeEndDate(value as number, "minute");
            }}
            value={endDate.minute}
          >
            {minutes.map((m) => (
              <Option key={m} value={m}>
                {m.toString().padStart(2, "0")} m
              </Option>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Fieldset>
  );
};

export default React.memo(EndDateFieldset);
