import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { theme } from "../../lib/theme";
import DateRangePicker from "../../components/v2/DateRangePicker";

export default {
  title: "Components/v2/DateRangePicker",
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Preview = () => {
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);
  return (
    <CssVarsProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2} xs={12}>
          <Grid xs={6}>
            <DateRangePicker
              value={selectedDates}
              onChange={(dates) => setDates(dates)}
            />
          </Grid>
          <Grid xs={6}>
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
        </Grid>
      </LocalizationProvider>
    </CssVarsProvider>
  );
};
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
