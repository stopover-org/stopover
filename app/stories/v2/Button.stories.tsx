import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonProps, CssVarsProvider, Grid } from "@mui/joy";
import ThumbUp from "@mui/icons-material/ThumbUp";
import Button from "../../components/v2/Button";
import { theme } from "../../lib/theme";

export default {
  title: "Components/v2/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
  },
} as ComponentMeta<typeof Button>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={3}>
        <Grid xs={12}>
          <Button>Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button startDecorator={<ThumbUp />}>Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button endDecorator={<ThumbUp />}>Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button disabled endDecorator={<ThumbUp />}>
            Book
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button loading>Loading</Button>
        </Grid>
      </Grid>
      {/* Button Sizes */}
      <Grid xs={3}>
        <Grid xs={12}>
          <Button size="sm">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button size="md">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button size="lg">Book</Button>
        </Grid>
      </Grid>
      {/* Button variants */}
      <Grid xs={3}>
        <Grid xs={12}>
          <Button variant="solid">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button variant="soft">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button variant="outlined">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button variant="plain">Book</Button>
        </Grid>
      </Grid>
      {/* Button colors */}
      <Grid xs={3}>
        <Grid xs={12}>
          <Button color="primary">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button color="neutral">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button color="danger">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button color="info">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button color="warning">Book</Button>
        </Grid>
        <Grid xs={12}>
          <Button color="success">Book</Button>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: ButtonProps) => <Button {...args} />;
export const Default: ComponentStory<typeof Button> = Template.bind({});
Default.args = {
  children: "Press me",
};
