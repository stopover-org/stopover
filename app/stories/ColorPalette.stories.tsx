import React from "react";
import { ComponentStory } from "@storybook/react";
import { Box, CssVarsProvider, Grid } from "@mui/joy";
import { theme } from "../lib/theme";
import Typography from "../components/v2/Typography";

export default {
  title: "Global Properties/Color Palette",
};

const colorNames = [
  "common",
  "danger",
  "info",
  "neutral",
  "primary",
  "success",
];

const Preview = () => (
  <CssVarsProvider theme={theme}>
    {Object.keys(theme.colorSchemes).map((schemaName: string) => (
      <>
        <Typography level="h3">{schemaName.toUpperCase()} THEME</Typography>
        <Grid container xs={12}>
          {colorNames.map((name) => (
            <>
              <Typography>{name}</Typography>
              <Grid spacing={2} container xs={12}>
                {/* @ts-ignore */}
                {Object.keys(theme.colorSchemes[schemaName].palette[name]).map(
                  (colorIndex) =>
                    !Number.isNaN(parseInt(colorIndex, 10)) && (
                      <Grid xs={1}>
                        <Box
                          key={`${schemaName}-${name}-${colorIndex}`}
                          sx={{
                            width: "135px",
                            height: "135px",
                            backgroundColor:
                              // @ts-ignore
                              theme.colorSchemes[schemaName].palette[name][
                                colorIndex
                              ],
                          }}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </>
          ))}
        </Grid>
      </>
    ))}
  </CssVarsProvider>
);

export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
