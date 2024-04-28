import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid, Stack } from "@mui/joy";
import Typography from "components/v2/Typography";
import { theme } from "lib/theme";
import Rating from "components/v2/Rating";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container xs={12}>
      <Grid
        container
        xs={12}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid xs={4}>
          <Rating rating={5} />
        </Grid>
        <Grid xs={4}>
          <Stack direction="row" alignItems="flex-end">
            <Rating rating={3.75} />
            <Typography> Rating is 3.75 of 5</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Rating",
  component: Preview,
} as Meta<typeof Rating>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
