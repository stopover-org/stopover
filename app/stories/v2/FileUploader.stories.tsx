import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@mui/joy";
import FileUploader from "components/v2/FileUploader";

const Preview = () => (
  <Grid container spacing={2} xs={12}>
    <Grid xs={6}>
      <FileUploader onChange={() => {}} />
    </Grid>
  </Grid>
);

export default {
  title: "Components/V2/FileUploader",
  component: Preview,
} as Meta<typeof FileUploader>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
