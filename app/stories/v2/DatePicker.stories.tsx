import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import DatePicker from "components/v2/DatePicker";
import { theme } from "lib/theme";
import Typography from "components/v2/Typography";

const Preview = () => {
  const [value, setValue] = React.useState<Moment | null>(null);
  return (
    <CssVarsProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2} xs={12}>
          <Grid xs={6}>
            <DatePicker />
          </Grid>
          <Grid xs={6}>
            <DatePicker label="Enter some date" />
          </Grid>
          <Grid xs={6}>
            <DatePicker label="Enter some date" hint="some hint is here" />
          </Grid>
          <Grid xs={6}>
            <DatePicker label="Enter some date" error="some error is here" />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              label="Enter some date"
              error="some error is here"
              hint="both of them is here"
            />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              label="Datepicker with available dates"
              hint="Available dates case"
              availableDates={[
                moment(),
                moment().subtract(-2, "d"),
                moment().subtract(-4, "d"),
              ]}
            />
          </Grid>
          <Grid xs={12}>
            <Typography>
              On change accept moment as first argument and validation errors as
              the second argument
            </Typography>
            <DatePicker value={value} onChange={(date) => setValue(date)} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </CssVarsProvider>
  );
};

export default {
  title: "Components/v2/DatePicker",
  component: Preview,
} as Meta<typeof DatePicker>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
