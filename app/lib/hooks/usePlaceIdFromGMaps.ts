import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import React from "react";

export function usePlaceIdFromGMaps(placeId: string | null) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { placesService } = usePlacesService({
    apiKey: googleMapsApiKey || "",
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

  return React.useMemo(
    () => result?.address_components?.[0].short_name,
    [result, placeId]
  );
}
