import React from "react";
import { Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset/Fieldset";
import Typography from "components/v2/Typography/Typography";
import AddressAutocomplete from "components/v2/AddressAutocomplete/AddressAutocomplete";
import Input from "components/v2/Input/Input";
import useFormContext from "lib/hooks/useFormContext";
import { usePlaceIdFromGMaps } from "lib/hooks/usePlaceIdFromGMaps";
import { IAddress, useDetailedAddress } from "lib/hooks/useDetailedAddress";
import GoogleMap from "components/shared/GoogleMap";

interface AddressFieldsetProps {
  simple?: boolean;
  variant?: "outlined" | "solid" | "plain" | "soft";
  withHeader?: boolean;
}

const AddressFieldset = ({
  simple,
  variant,
  withHeader = true,
}: AddressFieldsetProps) => {
  const form = useFormContext<any>();
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
  const latitudeField = form.useFormField("latitude");
  const longitudeField = form.useFormField("longitude");
  const gMapCountryCode = usePlaceIdFromGMaps(countryCode);
  const fullAddress: IAddress = useDetailedAddress(fullAddressCode);

  React.useEffect(() => {
    const keys = [
      "country",
      "region",
      "city",
      "street",
      "houseNumber",
      "latitude",
      "longitude",
    ];

    keys.forEach((key: string) => {
      const value = (fullAddress as Record<string, string | null>)[key];
      let field = null;
      if (key === "country") {
        field = countryField;
      } else if (key === "region") {
        field = regionField;
      } else if (key === "city") {
        field = cityField;
      } else if (key === "street") {
        field = streetField;
      } else if (key === "houseNumber") {
        field = houseNumberField;
      } else if (key === "latitude") {
        field = latitudeField;
      } else if (key === "longitude") {
        field = longitudeField;
      }

      if (!field) return;
      if (Object.keys(fullAddress).length === 0) return;

      if (value) {
        field.onChange(value);
      } else {
        field.onChange("");
      }
    });
  }, [fullAddress]);

  const { t } = useTranslation();

  return (
    <Fieldset variant={variant}>
      {withHeader && (
        <Grid xs={12}>
          <Typography level="title-lg">{t("address.title")}</Typography>
        </Grid>
      )}
      {!simple && (
        <Grid xs={12}>
          <AddressAutocomplete
            countries={gMapCountryCode ? [gMapCountryCode] : undefined}
            value={fullAddressField.value}
            onChange={(value, placeId) => {
              fullAddressField.onChange(value);

              setFullAddressCode(placeId);
            }}
            label={t("models.address.attributes.fullAddress")}
            error={fullAddressField.error}
          />
        </Grid>
      )}
      <Grid lg={simple ? 12 : 6} md={simple ? 12 : 6} sm={12} xs={12}>
        <AddressAutocomplete
          types={["country"]}
          value={countryField.value}
          onChange={(value, placeId) => {
            countryField.onChange(value);

            setCountryCode(placeId);
          }}
          label={t("models.address.attributes.country")}
          error={countryField.error}
        />
      </Grid>
      {!simple && (
        <Grid md={6} sm={12}>
          <AddressAutocomplete
            types={[
              "administrative_area_level_1",
              "administrative_area_level_2",
              "administrative_area_level_3",
            ]}
            countries={gMapCountryCode ? [gMapCountryCode] : undefined}
            {...regionField}
            label={t("models.address.attributes.region")}
          />
        </Grid>
      )}
      {!simple && (
        <Grid md={6} sm={12}>
          <AddressAutocomplete
            types={["locality", "administrative_area_level_3"]}
            countries={gMapCountryCode ? [gMapCountryCode] : undefined}
            {...cityField}
            label={t("models.address.attributes.city")}
          />
        </Grid>
      )}
      {!simple && (
        <Grid md={6} sm={12}>
          <AddressAutocomplete
            types={["address"]}
            countries={gMapCountryCode ? [gMapCountryCode] : undefined}
            {...streetField}
            label={t("models.address.attributes.street")}
          />
        </Grid>
      )}
      {!simple && (
        <Grid md={6} sm={12}>
          <Input
            {...houseNumberField}
            label={t("models.address.attributes.houseNumber")}
          />
        </Grid>
      )}
      {!simple && latitudeField.value && longitudeField.value && (
        <Grid md={12} sm={12}>
          <GoogleMap
            center={{ lat: latitudeField.value, lng: longitudeField.value }}
          />
        </Grid>
      )}
    </Fieldset>
  );
};

export default React.memo(AddressFieldset);
