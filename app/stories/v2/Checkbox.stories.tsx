import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { Close } from "@mui/icons-material";
import { CheckboxProps } from "../../components/v2/Checkbox/Checkbox";
import Checkbox from "../../components/v2/Checkbox";
import { theme } from "../../lib/theme";

export default {
  title: "Components/V2/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

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
            label="Info"
            color="info"
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
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ref should be excluded from props
const Template = ({ ...args }: CheckboxProps) => <Checkbox {...args} />;
export const Default: ComponentStory<typeof Checkbox> = Template.bind({});
Default.args = {
  id: "your_uniq_id",
  children: "my children",
  disabled: false,
};
