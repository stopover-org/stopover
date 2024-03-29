import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import React from "react";

export interface IAddress {
  country?: string;
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export function useDetailedAddress(placeId?: string) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { placesService } = usePlacesService({
    apiKey: googleMapsApiKey,
  });
  const [result, setResult] = React.useState<any>(null);
  React.useEffect(() => {
    if (placeId) {
      placesService?.getDetails(
        {
          placeId,
        },
        (placeDetails) => setResult(placeDetails)
      );
    }
  }, [placeId, googleMapsApiKey]);

  return React.useMemo(() => {
    const address: IAddress = {};
    if (!result) return address;

    address.latitude = result.geometry.location.lat();

    address.longitude = result.geometry.location.lng();

    return result.address_components.reduce(
      (
        output: IAddress,
        address_component: google.maps.GeocoderAddressComponent
      ) => {
        if (address_component.types.includes("street_number")) {
          output.houseNumber = address_component.long_name;
        }
        if (address_component.types.includes("route")) {
          output.street = address_component.long_name;
        }
        if (address_component.types.includes("locality")) {
          output.city = address_component.long_name;
        }
        if (address_component.types.includes("administrative_area_level_1")) {
          output.region = address_component.long_name;
        }
        if (address_component.types.includes("country")) {
          output.country = address_component.long_name;
        }
        if (address_component.types.includes("postal_code")) {
          output.postalCode = address_component.long_name;
        }
        return output;
      },
      address
    );
  }, [result, placeId, placesService]);
}
