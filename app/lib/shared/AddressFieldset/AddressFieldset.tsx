import React from "react";
import { Grid } from "@mui/joy";
import Fieldset from "../../../components/v2/Fieldset/Fieldset";
import Typography from "../../../components/v2/Typography/Typography";
import AddressAutocomplete from "../../../components/v2/AddressAutocomplete/AddressAutocomplete";
import Input from "../../../components/v2/Input/Input";
import useFormContext from "../../hooks/useFormContext";
import { CreateFirmFields } from "../../../scenes/firms/CreateFirmScene/useCreateFirmForm";
import { usePlaceIdFromGMaps } from "../../hooks/usePlaceIdFromGMaps";
import { IAddress, useDetailedAddress } from "../../hooks/useDetailedAddress";

const AddressFieldset = () => {
  const form = useFormContext<CreateFirmFields>();
  const [countryCode, setCountryCode] = React.useState<string | null>(null);
  const [fullAddressCode, setFullAddressCode] = React.useState<
    string | undefined
  >(undefined);
  const countryField = form.useFormField("country");
  const regionField = form.useFormField("region");
  const cityField = form.useFormField("city");
  const streetField = form.useFormField("street");
  const houseNumberField = form.useFormField("houseNumber");
  const fullAddressField = form.useFormField("fullAddress");
  const gMapCountryCode = usePlaceIdFromGMaps(countryCode);
  const clearAddress = React.useCallback(() => {
    regionField.onChange("");

    cityField.onChange("");

    streetField.onChange("");

    houseNumberField.onChange("");

    fullAddressField.onChange("");

    fullAddressField.onChange("");
  }, [
    countryField,
    regionField,
    cityField,
    streetField,
    houseNumberField,
    fullAddressField,
  ]);
  const fullAddress: IAddress = useDetailedAddress(fullAddressCode);

  React.useEffect(() => {
    Object.entries(fullAddress).forEach(([key, value]) => {
      if (value) {
        if (key === "country") {
          countryField.onChange(value);
        } else if (key === "region") {
          regionField.onChange(value);
        } else if (key === "city") {
          cityField.onChange(value);
        } else if (key === "street") {
          streetField.onChange(value);
        } else if (key === "houseNumber") {
          houseNumberField.onChange(value);
        }
      }
    });
  }, [fullAddress]);

  return (
    <Fieldset>
      <Grid xs={12}>
        <Typography level="h3">Address</Typography>
      </Grid>
      <Grid xs={12}>
        <AddressAutocomplete
          countries={gMapCountryCode ? [gMapCountryCode] : undefined}
          value={fullAddressField.value}
          onChange={(value, placeId) => {
            fullAddressField.onChange(value);

            setFullAddressCode(placeId);
          }}
          label="Full Address"
        />
      </Grid>
      <Grid md={6} sm={12}>
        <AddressAutocomplete
          types={["country"]}
          value={countryField.value}
          onChange={(value, placeId) => {
            countryField.onChange(value);

            setCountryCode(placeId);

            clearAddress();
          }}
          label="Country"
        />
      </Grid>
      <Grid md={6} sm={12}>
        <AddressAutocomplete
          types={[
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
          ]}
          countries={gMapCountryCode ? [gMapCountryCode] : undefined}
          {...regionField}
          label="Region"
        />
      </Grid>
      <Grid md={6} sm={12}>
        <AddressAutocomplete
          types={["locality", "administrative_area_level_3"]}
          countries={gMapCountryCode ? [gMapCountryCode] : undefined}
          {...cityField}
          label="City"
        />
      </Grid>
      <Grid md={6} sm={12}>
        <AddressAutocomplete
          types={["address"]}
          countries={gMapCountryCode ? [gMapCountryCode] : undefined}
          {...streetField}
          label="Street"
        />
      </Grid>
      <Grid md={6} sm={12}>
        <Input {...houseNumberField} label="House Number" />
      </Grid>
    </Fieldset>
  );
};

export default React.memo(AddressFieldset);
