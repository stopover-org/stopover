import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CssVarsProvider,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
} from "@mui/joy";
import { Close } from "@mui/icons-material";
import { theme } from "../../lib/theme";
import Radio from "../../components/v2/Radio";
import { RadioProps } from "../../components/v2/Radio/Radio";

export default {
  title: "Components/V2/Radio",
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={3}>
        <Grid xs={12}>
          <Radio label="Label for radio" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Radio defaultChecked label="Label for radio" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Radio
            defaultChecked
            label="Label for radio"
            hint="A long explanation for this radio"
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Radio
            onChange={() => {}}
            uncheckedIcon={<Close />}
            label="I have an icon when unchecked"
          />
        </Grid>
        <Grid xs={12}>
          <Radio
            onChange={() => {}}
            checkedIcon={<Close />}
            label="I have an icon when checked"
          />
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Radio label="Label for radio" size="sm" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Radio label="Label for radio" size="md" onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Radio label="Label for radio" size="lg" onChange={() => {}} />
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Radio
            label="Primary"
            color="primary"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Radio
            label="Neutral"
            color="neutral"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Radio
            label="Danger"
            color="danger"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Radio label="Info" color="info" defaultChecked onChange={() => {}} />
        </Grid>
        <Grid xs={12}>
          <Radio
            label="Success"
            color="success"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <Radio
            label="Warning"
            color="warning"
            defaultChecked
            onChange={() => {}}
          />
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Warning Group</FormLabel>

            <RadioGroup>
              <Radio
                label="Warning 1"
                color="warning"
                value={1}
                defaultChecked
                onChange={() => {}}
              />
              <Radio
                label="Warning 2"
                color="warning"
                value={2}
                onChange={() => {}}
              />
              <Radio
                label="Warning 3"
                color="warning"
                value={3}
                onChange={() => {}}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = ({ ...args }: RadioProps) => <Radio {...args} />;
export const Default: ComponentStory<typeof Radio> = Template.bind({});
Default.args = {
  id: "your_uniq_id",
};
