import {
  Autocomplete,
  AutocompleteOption,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import countryCodeEmoji from "country-code-emoji";
import React from "react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import Typography from "../Typography";

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
            <ListItemDecorator>
              {countryCodeEmoji(countryCode)}
            </ListItemDecorator>
            <ListItemContent sx={{ fontSize: "sm" }}>
              {countryName.of(countryCode)}
              <Typography level="body3">
                ({countryCode}) +{callingCode}
              </Typography>
            </ListItemContent>
          </AutocompleteOption>
        );
      }}
    />
  );
  // return (
  //   <Select
  //     variant="plain"
  //     value={selectedCountry}
  //     onChange={(_, val) => {
  //       if (!val) return;
  //       onChange(`+${countryPhoneCodes[val]}`);
  //
  //       onCountryChange(val);
  //     }}
  //     sx={{ "&:hover": { bgcolor: "transparent" } }}
  //   >
  //     {Object.keys(countryPhoneCodes)
  //       .filter(Boolean)
  //       .map((countryCode: string) => (
  //         <Option key={countryCode} value={countryCode}>
  //           {countryCodeEmoji(countryCode)}
  //           (+{countryPhoneCodes[countryCode]})
  //         </Option>
  //       ))}
  //   </Select>
  // );
};

export default React.memo(CountryCodesAutocomplete);
