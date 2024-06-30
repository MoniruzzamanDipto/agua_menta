import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapComponent = ({ locations, activeLocationId, setActiveLocationId }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: locations[0].lat,
    lng: locations[0].lng,
  });
  const zoom = 9;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBZMN6rpIcD8F0H65kWEEgmRUPG0-cX0vs",
  });

  const handleMarkerClick = (location) => {
    setActiveLocationId(location.id);
    setMapCenter({ lat: location.lat, lng: location.lng });
    setSelectedLocation(location);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "650px" }}
      center={mapCenter}
      zoom={zoom}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.title}
          // label={{
          //   text: location.title,
          //   color: location.id === activeLocationId ? "#5491f5" : "#b31412",
          //   fontSize: "12px",
          //   fontWeight: "bold",
          // }}
          icon={{
            url:
              location.id === activeLocationId
                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                : location.icon.url,
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32),
          }}
          onClick={() => handleMarkerClick(location)}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <h2>{selectedLocation.title}</h2>
            <p>Latitude: {selectedLocation.lat}</p>
            <p>Longitude: {selectedLocation.lng}</p>
            <p>Address: {selectedLocation.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
