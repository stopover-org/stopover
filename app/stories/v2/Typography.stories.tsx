import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import Typography from "components/v2/Typography";
import { theme } from "lib/theme";

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container xs={12}>
      <Grid spacing={2} container xs={6}>
        {Object.keys(theme.typography)
          // @ts-ignore
          .filter((level: any) => Boolean(theme.typography[level]))
          .map((level: any) => (
            <Grid xs={12}>
              <Typography key={level} level={level}>
                {level}
              </Typography>
            </Grid>
          ))}
      </Grid>
      <Grid
        container
        xs={6}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid xs={12}>
          <Typography>Default text</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography strikeThrough>Strikethrough text</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography fontStyle="italic">Italic text</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography underline>Underline text</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography fontWeight="700">Bold text</Typography>
        </Grid>
      </Grid>
    </Grid>
  </CssVarsProvider>
);

export default {
  title: "Components/V2/Typography",
  component: Preview,
} as Meta<typeof Typography>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: { controls: { hideNoControlsWarning: true } },
};
