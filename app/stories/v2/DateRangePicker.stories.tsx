import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { theme } from "../../lib/theme";
import DateRangePicker from "../../components/v2/DateRangePicker";

export default {
  title: "Components/v2/DateRangePicker",
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={2} xs={12}>
        <Grid xs={6}>
          <DateRangePicker open />
        </Grid>
      </Grid>
    </LocalizationProvider>
  </CssVarsProvider>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: any) => <DateRangePicker {...args} />;
export const Default: ComponentStory<typeof DateRangePicker> = Template.bind(
  {}
);
Default.args = {};
