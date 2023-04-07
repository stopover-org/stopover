import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";
import DatePicker from "../../components/v2/DatePicker";
import Button from "../../components/v2/Button/Button";
import { theme } from "../../lib/theme";
import Typography from "../../components/v2/Typography";

export default {
  title: "Components/v2/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

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
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: any) => <DatePicker {...args} />;
export const Default: ComponentStory<typeof Button> = Template.bind({});
Default.args = {
  children: "Press me",
};
