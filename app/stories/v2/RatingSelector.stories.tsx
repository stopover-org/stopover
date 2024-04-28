import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import RatingSelector from "components/v2/RatingSelector";

const Preview = () => {
  const [rating, setRating] = React.useState(5);
  return (
    <CssVarsProvider theme={theme}>
      <Grid container xs={12}>
        <Grid
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid xs={4}>
            <RatingSelector
              onSelect={(val) => setRating(val)}
              rating={rating}
            />
          </Grid>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default {
  title: "Components/V2/RatingSelector",
  component: Preview,
} as Meta<typeof RatingSelector>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
