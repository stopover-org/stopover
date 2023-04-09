import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import Typography from "../../components/v2/Typography";
import { TypographyProps } from "../../components/v2/Typography/Typography";
import { theme } from "../../lib/theme";
import SliderRange from "../../components/v2/SliderRange";
import Input from "../../components/v2/Input";

export default {
  title: "Components/V2/SliderRange",
  component: SliderRange,
} as ComponentMeta<typeof SliderRange>;

const Preview = () => {
  const [value, setValue] = React.useState([200, 9900]);
  return (
    <CssVarsProvider theme={theme}>
      <Grid container spacing={2} xs={12}>
        <Grid
          container
          xs={6}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid xs={6}>
            <Input
              value={value[0].toString()}
              onChange={(v) => setValue([parseInt(v, 10), value[1]])}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              value={value[1].toString()}
              onChange={(v) => setValue([value[0], parseInt(v, 10)])}
            />
          </Grid>
          <Grid xs={12}>
            <SliderRange
              min={100}
              max={10000}
              value={value}
              onChange={setValue}
              valueLabelDisplay="on"
              size="lg"
            />
          </Grid>
          <Grid xs={12}>
            <SliderRange
              min={100}
              max={10000}
              value={value}
              onChange={setValue}
              valueLabelDisplay="on"
              size="lg"
              label="I am Groot"
              hint="From the Greece"
              error="With some deaf"
            />
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

const Template: ComponentStory<typeof Typography> = (args: TypographyProps) => (
  <CssVarsProvider theme={theme}>
    <Typography {...args} />
  </CssVarsProvider>
);
export const Default = Template.bind({});
Default.args = {
  children: "Header",
  strikeThrough: false,
  underline: false,
  lineHeight: "1.2em",
};
