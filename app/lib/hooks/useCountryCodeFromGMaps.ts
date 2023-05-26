import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import React from "react";

export function useCountryCodeFromGMaps(
  apiKey: string,
  country: string | null
) {
  const { placesService } = usePlacesService({
    apiKey,
  });
  const [result, setResult] = React.useState<any>(null);
  React.useEffect(() => {
    if (country) {
      placesService?.getDetails(
        {
          placeId: country,
        },
        (placeDetails) => setResult(placeDetails)
      );
    }
  }, [country, apiKey]);

  return React.useMemo(
    () => result?.address_components?.[0].short_name,
    [result, country]
  );
}
