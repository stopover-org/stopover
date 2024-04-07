import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import ThumbUp from "@mui/icons-material/ThumbUp";
import Button from "components/v2/Button";
import { theme } from "lib/theme";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={3}>
        <Grid xs={12} padding={2}>
          <Button>Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button startDecorator={<ThumbUp />}>Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button endDecorator={<ThumbUp />}>Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button disabled endDecorator={<ThumbUp />}>
            Book
          </Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button loading>Loading</Button>
        </Grid>
      </Grid>
      {/* Button Sizes */}
      <Grid xs={3}>
        <Grid xs={12} padding={2}>
          <Button size="sm">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button size="md">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button size="lg">Book</Button>
        </Grid>
      </Grid>
      {/* Button variants */}
      <Grid xs={3}>
        <Grid xs={12} padding={2}>
          <Button variant="solid">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button variant="soft">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button variant="outlined">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button variant="plain">Book</Button>
        </Grid>
      </Grid>
      {/* Button colors */}
      <Grid xs={3}>
        <Grid xs={12} padding={2}>
          <Button color="primary">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button color="neutral">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button color="danger">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button color="warning">Book</Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <Button color="success">Book</Button>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/v2/Button",
  component: Preview,
} as Meta<typeof Button>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
