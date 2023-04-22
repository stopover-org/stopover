import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { theme } from "../../lib/theme";
import ButtonDatePicker from "../../components/v2/ButtonDatePicker";

export default {
  title: "Components/v2/ButtonDatePicker",
  component: ButtonDatePicker,
} as ComponentMeta<typeof ButtonDatePicker>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={2} xs={12}>
        <Grid xs={3}>
          <Grid xs={12}>
            <ButtonDatePicker onChange={(date) => console.log(date)}>
              Book
            </ButtonDatePicker>
          </Grid>
          <Grid xs={12}>
            <ButtonDatePicker
              variant="outlined"
              onChange={(date) => console.log(date)}
            >
              Book
            </ButtonDatePicker>
          </Grid>
          <Grid xs={12}>
            <ButtonDatePicker
              variant="outlined"
              onChange={(date) => console.log(date)}
              datePickerProps={{
                availableDates: [
                  moment(),
                  moment().subtract(-2, "d"),
                  moment().subtract(-4, "d"),
                ],
              }}
            >
              Available Dates case
            </ButtonDatePicker>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  </CssVarsProvider>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
