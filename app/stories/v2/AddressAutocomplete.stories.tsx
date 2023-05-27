import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Grid } from "@mui/joy";
import AddressAutocomplete from "../../components/v2/AddressAutocomplete";
import { theme } from "../../lib/theme";
import Typography from "../../components/v2/Typography";

export default {
  title: "Components/v2/AddressAutocomplete",
  component: AddressAutocomplete,
} as ComponentMeta<typeof AddressAutocomplete>;

const Preview = () => (
  <CssVarsProvider theme={theme}>
    <Grid container spacing={2} xs={12}>
      <Grid xs={4}>
        <Typography>Country Autocomplete</Typography>
        <AddressAutocomplete types={["country"]} />
      </Grid>
      <Grid xs={4}>
        <Typography>City Autocomplete</Typography>
        <AddressAutocomplete
          types={["locality", "administrative_area_level_2"]}
        />
      </Grid>
      <Grid xs={4}>
        <Typography>Full Address Autocomplete</Typography>
        <AddressAutocomplete types={["address"]} />
      </Grid>
      <Grid xs={4}>
        <Typography>Postal Code Autocomplete</Typography>
        <AddressAutocomplete types={["postal_code"]} />
      </Grid>
      <Grid xs={4}>
        <Typography>Postal Code Autocomplete Restricted by Country</Typography>
        <AddressAutocomplete types={["postal_code"]} countries={["ge"]} />
      </Grid>
    </Grid>
  </CssVarsProvider>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
