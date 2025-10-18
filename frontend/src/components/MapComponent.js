import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// fix default marker icon paths for CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ incidents = [], center = [20.5937, 78.9629], zoom = 5 }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: 400, width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents &&
        incidents.length > 0 &&
        incidents.map((it) => {
          const lat = it?.location?.lat;
          const lng = it?.location?.lng;

          // only render marker if both lat and lng exist
          if (lat == null || lng == null) return null;

          return (
            <Marker key={it._id} position={[lat, lng]}>
              <Popup>
                <div>
                  <strong>{it.type}</strong>
                  <div>{it.description}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapComponent;
