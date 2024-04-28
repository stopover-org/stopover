import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { theme } from "lib/theme";
import DateRangePicker from "components/v2/DateRangePicker";
import Typography from "components/v2/Typography";

const Preview = () => {
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);

  return (
    <CssVarsProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2} xs={12}>
          <Grid xs={6}>
            <Typography level="h3">Default</Typography>
            <DateRangePicker
              value={selectedDates}
              onChange={(dates) => setDates(dates)}
            />
          </Grid>
          <Grid xs={6}>
            <Typography level="h3">With input props</Typography>
            <DateRangePicker
              value={selectedDates}
              onChange={(dates) => setDates(dates)}
              startInputProps={{
                label: "Start Date",
                placeholder: "Enter Start of your trip",
                hint: "Enter Start of your trip",
              }}
              endInputProps={{
                label: "End Date",
                placeholder: "Enter End of your trip",
                hint: "Enter End of your trip",
              }}
            />
          </Grid>
          <Grid xs={6}>
            <Typography level="h3">With unavailable dates</Typography>
            <DateRangePicker
              value={selectedDates}
              onChange={(dates) => setDates(dates)}
              startInputProps={{
                label: "Start Date",
                placeholder: "Enter Start of your trip",
                hint: "Enter Start of your trip",
              }}
              endInputProps={{
                label: "End Date",
                placeholder: "Enter End of your trip",
                hint: "Enter End of your trip",
              }}
              availableDates={[
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
};

export default {
  title: "Components/v2/DateRangePicker",
  component: Preview,
} as Meta<typeof DateRangePicker>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
