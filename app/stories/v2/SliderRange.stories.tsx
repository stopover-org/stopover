import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import SliderRange from "components/v2/SliderRange";
import Input from "components/v2/Input";

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

export default {
  title: "Components/V2/SliderRange",
  component: Preview,
} as Meta<typeof SliderRange>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
