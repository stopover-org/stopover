import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import Link from "components/v2/Link";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={6}>
        <Link href="/yoyoyo">Press Me</Link>
      </Grid>
      <Grid xs={6}>
        <Link href="/yoyoyo" disabled>
          Press Me
        </Link>
      </Grid>
      <Grid xs={6}>
        <Link href="/yoyoyo" color="primary">
          Press Me
        </Link>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Link",
  component: Preview,
} as Meta<typeof Link>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
