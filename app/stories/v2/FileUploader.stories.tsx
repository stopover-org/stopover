import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Grid } from "@mui/joy";
import FileUploader from "components/v2/FileUploader";

export default {
  title: "Components/V2/FileUploader",
  component: FileUploader,
} as ComponentMeta<typeof FileUploader>;

const Preview = () => (
  <Grid container spacing={2} xs={12}>
    <Grid xs={6}>
      <FileUploader onChange={() => {}} />
    </Grid>
  </Grid>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
