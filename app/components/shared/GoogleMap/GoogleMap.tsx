import React from "react";
import {
  GoogleMap as GoogleMapBound,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface GoogleMapProps {
  width?: string;
  height?: string;
  center: { lat: number; lng: number };
  markers?: Array<{ lat: number; lng: number }>;
}

const GoogleMap = ({
  width = "100%",
  height = "200px",
  center,
  markers = [],
}: GoogleMapProps) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey!,
    libraries: ["places"],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleMap, setMap] = React.useState<any>(null);
  const onLoad = React.useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    map.setZoom(18);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  React.useEffect(() => {
    if (!googleMap) return;
    googleMap?.setCenter(center);

    googleMap?.setZoom(18);
  }, [googleMap, center, markers]);

  return isLoaded ? (
    <GoogleMapBound
      mapContainerStyle={{ width, height }}
      options={{ disableDefaultUI: true, zoom: 18, maxZoom: 18 }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((marker, index) => (
        <Marker key={`${JSON.stringify(marker)}-${index}`} position={marker} />
      ))}
    </GoogleMapBound>
  ) : null;
};

export default React.memo(GoogleMap);
