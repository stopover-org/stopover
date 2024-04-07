import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { theme } from "lib/theme";
import ButtonDatePicker from "components/v2/ButtonDatePicker";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={2} xs={12}>
        <Grid xs={3}>
          <Grid xs={12} padding={2}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            <ButtonDatePicker onChange={(date) => {}}>Book</ButtonDatePicker>
          </Grid>
          <Grid xs={12} padding={2}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            <ButtonDatePicker variant="outlined" onChange={(date) => {}}>
              Book
            </ButtonDatePicker>
          </Grid>
          <Grid xs={12} padding={2}>
            <ButtonDatePicker
              variant="outlined"
              /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
              onChange={(date) => {}}
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
          <Grid xs={12} padding={2}>
            <ButtonDatePicker
              variant="outlined"
              /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
              onChange={(date) => {}}
              datePickerProps={{
                availableDates: [
                  moment(),
                  moment().subtract(-2, "d"),
                  moment().subtract(-4, "d"),
                ],
                highlightedDates: [
                  moment(),
                  moment().subtract(-2, "d"),
                  moment().subtract(-4, "d"),
                ],
              }}
            >
              Available and highlighted dates case
            </ButtonDatePicker>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  </CssVarsProvider>
);

export default {
  title: "Components/v2/ButtonDatePicker",
  component: Preview,
} as Meta<typeof ButtonDatePicker>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
