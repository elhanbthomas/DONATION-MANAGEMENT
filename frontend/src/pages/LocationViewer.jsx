// src/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationViewer = () => {
  const position = [51.505, -0.09]; // Center position [latitude, longitude]

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty marker with Leaflet and OpenStreetMap.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationViewer;
