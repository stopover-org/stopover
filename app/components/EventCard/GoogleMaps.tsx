import React from "react";
import styled from "styled-components";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Wrapper = styled.div`
  padding: 6px 6px 6px 0px;
  .map-container {
    width: 100%;
    min-height: 500px;
    border: 1px solid black;
  }
`;

type Props = {
  googleMapsApiKey: string;
  latitude: number;
  longitude: number;
};

const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => (
  /* const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {}
    ) */
  <GoogleMap
    zoom={10}
    center={{ lat: latitude, lng: longitude }}
    mapContainerClassName="map-container"
  >
    <Marker position={{ lat: 44, lng: -80 }} />
  </GoogleMap>
);
export default GoogleMaps = ({
  latitude,
  longitude,
  googleMapsApiKey,
}: Props) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Wrapper>
      <Map latitude={latitude} longitude={longitude} />
    </Wrapper>
  );
};
