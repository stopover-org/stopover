import React from "react";
import styled from "styled-components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { CalendarMonthTwoTone } from "@mui/icons-material";
import Input from "../../components/v2/Input";
import { InputProps } from "../../components/v2/Input/Input";
import { theme } from "../../lib/theme";

const InputSize = styled.div`
  width: 180px;
  padding-bottom: 10px;
  padding-right: 10px;
`;

export default {
  title: "Components/v2/Input",
  component: Input,
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
  },
} as ComponentMeta<typeof Input>;

const Preview = () => {
  const onChange = () => {};
  return (
    <CssVarsProvider theme={theme}>
      <Grid container spacing={2}>
        {/* Common Inputs */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="Забронировать" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="" placeholder="Placeholder" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              error="You have some error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              label="Input label"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="ATV"
              startDecorator={<CalendarMonthTwoTone />}
              label="Забронировать"
            />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="ATV" label="Забронировать" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              endDecorator={<CalendarMonthTwoTone />}
              variant="outlined"
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="ATV"
              startDecorator={<CalendarMonthTwoTone />}
              label="Забронировать"
            />
          </Grid>
        </Grid>

        {/* Number Inputs */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="123" type="number" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="" placeholder="Placeholder" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              error="You have some error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              label="Input Label"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              startDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              endDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              endDecorator={<CalendarMonthTwoTone />}
              variant="outlined"
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              startDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
        </Grid>

        {/* Input sizes */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default size" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="sm" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="md" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="lg" />
          </Grid>
        </Grid>
        {/* Input Variants */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default variant" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="plain variant" variant="plain" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="outlined variant"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="soft variant" variant="soft" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="solid variant" variant="solid" />
          </Grid>
        </Grid>

        {/* Different Palettes Input */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default color" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="primary color" color="primary" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="neutral color" color="neutral" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="danger color" color="danger" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="info color" color="info" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="success color" color="success" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="warning color" color="warning" />
          </Grid>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: InputProps) => (
  <InputSize>
    <Input {...args} />
  </InputSize>
);
export const Default: ComponentStory<typeof Input> = Template.bind({});
Default.args = {
  value: "text",
  id: "your_uniq_id",
  type: "text",
  variant: "outlined",
  disabled: false,
  label: "my_label",
  hint: "my_hint",
  error: "",
};
