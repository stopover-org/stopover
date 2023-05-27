import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import React from "react";
import { useApiKey } from "./useApiKey";

export function usePlaceIdFromGMaps(placeId: string | null) {
  const googleMapsApiKey = useApiKey("googleMaps");
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
