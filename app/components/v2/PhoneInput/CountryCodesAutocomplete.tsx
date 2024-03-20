import {
  Autocomplete,
  AutocompleteOption,
  ListItemContent,
  ListItemDecorator,
  useTheme,
} from "@mui/joy";
import countryCodeEmoji from "country-code-emoji";
import React from "react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useMediaQuery } from "@mui/material";
import Typography from "components/v2/Typography";

interface CountryCodesAutocompleteProps {
  selectedCountry: string;
  onChange: (phone: string) => void;
  onCountryChange: (countryCode: string) => void;
  width?: string;
}

const CountryCodesAutocomplete = ({
  selectedCountry,
  onChange,
  onCountryChange,
  width = "260px",
}: CountryCodesAutocompleteProps) => {
  const onSelect = React.useCallback(
    (_: any, value: string | null) => {
      if (value) {
        const callingCode = getCountryCallingCode(value as CountryCode);
        onChange(`+${callingCode}`);

        onCountryChange(value!);
      }
    },
    [onChange, onCountryChange, selectedCountry]
  );
  const countryName = new Intl.DisplayNames(["en"], { type: "region" });
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Autocomplete
      value={selectedCountry}
      onChange={onSelect}
      options={getCountries()}
      disableClearable
      sx={{
        width,
        border: "none",
        transition: "width 0.1s ease",
        boxShadow: "none",
        margin: 0,
        fontSize: "sm",
      }}
      getOptionLabel={(opt) => {
        const country = countryName.of(opt);
        const callingCode = getCountryCallingCode(opt as CountryCode);
        return `(${country}) +${callingCode}`;
      }}
      renderOption={(props, countryCode: string) => {
        const callingCode = getCountryCallingCode(countryCode as CountryCode);
        return (
          <AutocompleteOption {...props}>
            {!isMobileView && (
              <ListItemDecorator sx={{ fontSize: "lg" }}>
                {countryCodeEmoji(countryCode)}
              </ListItemDecorator>
            )}
            <ListItemContent sx={{ fontSize: "10px" }}>
              {countryName.of(countryCode)}
              <Typography level="body-sm">
                ({countryCode}) +{callingCode}
              </Typography>
            </ListItemContent>
          </AutocompleteOption>
        );
      }}
    />
  );
};

export default React.memo(CountryCodesAutocomplete);
