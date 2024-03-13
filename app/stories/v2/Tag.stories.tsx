import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import Tag from "components/v2/Tag";

export default {
  title: "Components/V2/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

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
export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
