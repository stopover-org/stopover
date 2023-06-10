import {
  Autocomplete,
  AutocompleteOption,
  AutocompleteProps,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/joy";
import React from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { FieldError } from "react-hook-form";
import Typography from "../Typography";
import { useApiKey } from "../../../lib/hooks/useApiKey";

interface BaseAddressAutocompleteProps {
  countries?: string[];
  error?: FieldError;
  hint?: string | null;
  label?: string | null;
  onChange?: (value: string, placeId: string) => void;
  types?: Array<
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
  value?: string;
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

const AddressAutocomplete = React.forwardRef(
  (
    {
      types,
      onChange,
      value,
      countries,
      label,
      hint,
      error,
      ...props
    }: AddressAutocompleteProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: React.Ref<HTMLDivElement>
  ) => {
    const googleMapsApiKey = useApiKey("googleMaps");
    const { placePredictions, getPlacePredictions } = usePlacesService({
      apiKey: googleMapsApiKey || "",
    });

    const options = React.useMemo(
      () =>
        placePredictions.map((pred) => ({
          label: pred.structured_formatting.main_text,
          secondary: pred.structured_formatting.secondary_text,
          placeId: pred.place_id,
        })),
      [placePredictions]
    );

    return (
      <>
        {label && <FormLabel>{label}</FormLabel>}
        <Autocomplete
          {...props}
          value={value}
          options={options}
          onChange={(event, val, __, opt) => {
            if (onChange instanceof Function) {
              onChange(val ? val.label : null, opt?.option?.placeId);
            }
          }}
          onInputChange={(event, val) => {
            getPlacePredictions({
              input: val,
              types,
              offset: val.length,
              componentRestrictions: countries
                ? { country: countries }
                : undefined,
            });
          }}
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
          filterOptions={(opts) => opts}
        />
        {hint && <FormHelperText>{hint}</FormHelperText>}
        {error && (
          <FormHelperText>
            <Typography fontSize="sm" color="danger">
              {error.message}
            </Typography>
          </FormHelperText>
        )}
      </>
    );
  }
);

export default React.memo(AddressAutocomplete);
