import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { theme } from "lib/theme";
import DateCalendar from "components/v2/DateCalendar/DateCalendar";
import Typography from "components/v2/Typography";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={2} xs={12}>
        <Grid xs={6}>
          <DateCalendar />
        </Grid>
        <Grid xs={6}>
          <DateCalendar
            availableDates={[
              moment(),
              moment().subtract(-2, "d"),
              moment().subtract(-4, "d"),
            ]}
          />
        </Grid>
        <Grid xs={6}>
          <Typography>Highlighted and available dates</Typography>
          <DateCalendar
            availableDates={[
              moment(),
              moment().subtract(-2, "d"),
              moment().subtract(-4, "d"),
            ]}
            highlightedDates={[
              moment(),
              moment().subtract(-2, "d"),
              moment().subtract(-4, "d"),
            ]}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  </CssVarsProvider>
);

export default {
  title: "Components/v2/DateCalendar",
  component: Preview,
} as Meta<typeof DateCalendar>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
