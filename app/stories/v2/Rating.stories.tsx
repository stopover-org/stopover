import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid, Stack } from "@mui/joy";
import Typography from "components/v2/Typography";
import { theme } from "lib/theme";
import Rating from "components/v2/Rating";

export default {
  title: "Components/V2/Rating",
  component: Rating,
} as ComponentMeta<typeof Rating>;

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
export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
