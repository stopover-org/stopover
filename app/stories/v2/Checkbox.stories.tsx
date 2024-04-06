import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { Close } from "@mui/icons-material";
import Checkbox from "components/v2/Checkbox";
import { theme } from "lib/theme";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={3}>
        <Grid xs={12}>
          <Checkbox label="Label for checkbox" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            defaultChecked
            label="Label for checkbox"
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            defaultChecked
            label="Label for checkbox"
            hint="A long explanation for this checkbox"
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            onChange={() => {}}
            uncheckedIcon={<Close />}
            label="I have an icon when unchecked"
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            onChange={() => {}}
            checkedIcon={<Close />}
            label="I have an icon when checked"
          />
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Checkbox label="Label for checkbox" size="sm" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Checkbox label="Label for checkbox" size="md" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Checkbox label="Label for checkbox" size="lg" onChange={() => {}} />
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Checkbox
            label="Primary"
            color="primary"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            label="Neutral"
            color="neutral"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            label="Danger"
            color="danger"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            label="Success"
            color="success"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Checkbox
            label="Warning"
            color="warning"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Checkbox",
  component: Preview,
} as Meta<typeof Checkbox>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
