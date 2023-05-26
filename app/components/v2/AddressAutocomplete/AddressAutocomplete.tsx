import {
  Autocomplete,
  AutocompleteOption,
  AutocompleteProps,
  Stack,
} from "@mui/joy";
import React from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Typography from "../Typography";

interface BaseAddressAutocompleteProps {
  types: Array<
    | "geocode"
    | "address"
    | "establishment"
    | "locality"
    | "sublocality"
    | "postal_code"
    | "country"
    | "administrative_area_level_1"
    | "administrative_area_level_2"
    | "administrative_area_level_3"
  >;
  onChange?: (value: string) => void;
  value?: string;
  countries?: string[];
  apiKey: string;
}

// @ts-ignore
interface AddressAutocompleteProps
  extends Omit<
      Omit<
        AutocompleteProps<any, false, false, any>,
        keyof BaseAddressAutocompleteProps
      >,
      "options"
    >,
    BaseAddressAutocompleteProps {}

const AddressAutocomplete = ({
  types,
  onChange,
  value,
  countries,
  apiKey,
  ...props
}: AddressAutocompleteProps) => {
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });

  return (
    <Autocomplete
      {...props}
      value={value}
      options={placePredictions.map((pred) => ({
        label: pred.structured_formatting.main_text,
        secondary: pred.structured_formatting.secondary_text,
      }))}
      onChange={(_, val) => {
        if (onChange instanceof Function) {
          onChange(val || "");
        }
      }}
      onInputChange={(event, val) =>
        getPlacePredictions({
          input: val,
          types,
          offset: val.length,
          componentRestrictions: countries ? { country: countries } : undefined,
        })
      }
      renderOption={(optionProps, option, { selected }) => (
        <AutocompleteOption
          {...optionProps}
          color={selected ? "primary" : "neutral"}
        >
          <Stack>
            <Typography>{option.label}</Typography>
            {option.secondary && (
              <Typography fontSize="sm">{option.secondary}</Typography>
            )}
          </Stack>
        </AutocompleteOption>
      )}
    />
  );
};

export default React.memo(AddressAutocomplete);
