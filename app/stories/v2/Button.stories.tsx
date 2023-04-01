import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonProps, CssVarsProvider, Grid } from "@mui/joy";
import ThumbUp from "@mui/icons-material/ThumbUp";
import Button from "../../components/v2/Button";
import Typography from "../../components/v2/Typography";
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
      <Grid xs={6}>
        <Grid xs={12}>
          <Button>
            <Typography>Book</Typography>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button startDecorator={<ThumbUp />}>
            <Typography>Book</Typography>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button endDecorator={<ThumbUp />}>
            <Typography>Book</Typography>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button disabled endDecorator={<ThumbUp />}>
            <Typography>Book</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid xs={6}>
        <Grid xs={12}>
          <Button size="sm">
            <Typography>Book</Typography>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button size="md">
            <Typography>Book</Typography>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button size="lg">
            <Typography>Book</Typography>
          </Button>
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
