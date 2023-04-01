import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { CheckboxProps } from "../../components/v2/Checkbox/Checkbox";
import Checkbox from "../../components/v2/Checkbox";
import { theme } from "../../lib/theme";

export default {
  title: "Components/V2/Checkbox",
  component: Checkbox,
  argTypes: {
    id: { control: "text" },
    children: { control: "text" },
    disabled: { control: "boolean" },
    type: { control: "select" },
    checked: { control: "boolean" },
    size: { control: "select" },
    animate: { control: "boolean" },
  },
} as ComponentMeta<typeof Checkbox>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={6}>
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
      </Grid>

      <Grid xs={6}>
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
