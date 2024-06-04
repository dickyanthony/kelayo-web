import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

const MapComponent = ({ draggable = false, setPositionProps, position }) => {
  const handleMapClick = (e) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${e.latlng.lat},${e.latlng.lng}`,
      '_blank'
    );
  };

  const SetViewOnClick = () => {
    const map = useMap();
    map.on('move', () => {
      const center = map.getCenter();
      setPositionProps(center.lat, center.lng);
    });

    return null;
  };

  return (
    <MapContainer
      dragging={draggable}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick />
      <UseMapClickEvent onClick={handleMapClick} />
      <Marker position={position} draggable={draggable} />
      <RecenterAutomatically lat={position[0]} lng={position[1]} />
    </MapContainer>
  );
};

const UseMapClickEvent = ({ onClick }) => {
  const map = useMapEvents({
    click: onClick,
  });
  return null;
};

export default MapComponent;
