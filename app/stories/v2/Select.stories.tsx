import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Chip, CssVarsProvider, Grid, Option } from "@mui/joy";
import { FavoriteBorder } from "@mui/icons-material";
import { theme } from "lib/theme";
import Select from "components/v2/Select";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={3}>
        <Grid xs={12}>
          <Select label="Common Select" placeholder="Select an animal">
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select"
            hint="Long explanation for this select"
            placeholder="Select an animal"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select"
            placeholder="Select an animal"
            startDecorator={<FavoriteBorder />}
            endDecorator={
              <Chip size="sm" color="danger" variant="soft">
                +5
              </Chip>
            }
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Small)"
            placeholder="Select an animal"
            size="sm"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Medium)"
            placeholder="Select an animal"
            size="md"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Large)"
            placeholder="Select an animal"
            size="lg"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Primary)"
            placeholder="Select an animal"
            color="primary"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="bird">Bird</Option>
            <Option value="fish">Fish</Option>
            <Option value="elephant">Elephant</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Neutral)"
            placeholder="Select an animal"
            color="neutral"
          >
            <Option color="neutral" value="dog">
              Dog
            </Option>
            <Option color="neutral" value="cat">
              Cat
            </Option>
            <Option color="neutral" value="bird">
              Bird
            </Option>
            <Option color="neutral" value="fish">
              Fish
            </Option>
            <Option color="neutral" value="elephant">
              Elephant
            </Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Danger)"
            placeholder="Select an animal"
            color="danger"
          >
            <Option color="danger" value="dog">
              Dog
            </Option>
            <Option color="danger" value="cat">
              Cat
            </Option>
            <Option color="danger" value="bird">
              Bird
            </Option>
            <Option color="danger" value="fish">
              Fish
            </Option>
            <Option color="danger" value="elephant">
              Elephant
            </Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Success)"
            placeholder="Select an animal"
            color="success"
          >
            <Option color="success" value="dog">
              Dog
            </Option>
            <Option color="success" value="cat">
              Cat
            </Option>
            <Option color="success" value="bird">
              Bird
            </Option>
            <Option color="success" value="fish">
              Fish
            </Option>
            <Option color="success" value="elephant">
              Elephant
            </Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Select
            defaultValue="dog"
            label="Common Select (Warning)"
            placeholder="Select an animal"
            color="warning"
          >
            <Option color="warning" value="dog">
              Dog
            </Option>
            <Option color="warning" value="cat">
              Cat
            </Option>
            <Option color="warning" value="bird">
              Bird
            </Option>
            <Option color="warning" value="fish">
              Fish
            </Option>
            <Option color="warning" value="elephant">
              Elephant
            </Option>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Select",
  component: Preview,
} as Meta<typeof Select>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
