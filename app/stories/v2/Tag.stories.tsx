import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import Tag from "components/v2/Tag";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={6}>
        <Tag href="/yoyoyo" color="primary" variant="outlined">
          Im another tag
        </Tag>
        &nbsp; &nbsp; &nbsp;
        <Tag href="/yoyoyo" color="primary">
          Im another tag
        </Tag>
        &nbsp; &nbsp; &nbsp;
        <Tag href="/yoyoyo" color="primary" fontSize="sm">
          Im another tag
        </Tag>
        &nbsp; &nbsp; &nbsp;
        <Tag href="/yoyoyo" color="primary" fontSize="md">
          Im another tag
        </Tag>
        &nbsp; &nbsp; &nbsp;
        <Tag href="/yoyoyo" color="primary" fontSize="lg">
          Im another tag
        </Tag>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Tag",
  component: Preview,
} as Meta<typeof Tag>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
