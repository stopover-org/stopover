import { Grid, Option, Stack } from "@mui/joy";
import React from "react";
import Fieldset from "../../../components/v2/Fieldset/Fieldset";
import Typography from "../../../components/v2/Typography/Typography";
import Select from "../../../components/v2/Select/Select";
import Checkbox from "../../../components/v2/Checkbox/Checkbox";

const RecurringDateFieldset = () => {
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);

  return (
    <Fieldset>
      <Grid xs={12}>
        <Typography level="h3">Time</Typography>
      </Grid>

      <Grid xs={12} container>
        <Grid xs={2}>
          <Select defaultValue={0} label="Hours" onChange={handleChange}>
            {hours.map((hour, index) => (
              <Option key={index}>{hour}</Option>
            ))}
          </Select>
        </Grid>
        <Grid xs={2}>
          <Select defaultValue={0} label="Minutes" onChange={handleChange}>
            {minutes.map((minute, index) => (
              <Option key={index}>{minute}</Option>
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
            ].map((day, index) => (
              <Typography>
                <Checkbox
                  key={index}
                  color="primary"
                  overlay
                  disableIcon
                  variant="soft"
                  label={day}
                  onChange={() => {}}
                />
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Fieldset>
  );
};

export default React.memo(RecurringDateFieldset);
