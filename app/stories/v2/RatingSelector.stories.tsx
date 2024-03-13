import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "lib/theme";
import RatingSelector from "components/v2/RatingSelector";

export default {
  title: "Components/V2/RatingSelector",
  component: RatingSelector,
} as ComponentMeta<typeof RatingSelector>;

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
export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
