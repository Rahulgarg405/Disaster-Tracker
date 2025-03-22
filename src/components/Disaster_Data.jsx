import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";
import LoadingBar from "react-top-loading-bar";
import Legend from "./Legend";

const icons = {
  wildfires: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: red;">🔥</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  severeStorms: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: blue;">⛈️</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Earthquakes: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: brown;">🌍</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  volcanoes: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: orange;">🌋</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Floods: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: darkblue;">🌊</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  seaLakeIce: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size: 24px; color: red;">❄️</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
};

const Disaster_Data = ({ events }) => {
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(0);
  //   console.log(events);
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(30);
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 20));
      }, 500);
    }

    if (events.length > 0) {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }

    return () => clearInterval(interval);
  }, [events, loading]);

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        position: "relative",
      }}
    >
      <LoadingBar
        color="#007bff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading map data...</p>
        </div>
      ) : (
        <div>
          <Legend />
          <MapContainer center={[20, 0]} zoom={2} className="leaflet-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {events.map((event) => {
              const category = event.categories[0].id;
              console.log(category);
              const icon = icons[category] || icons["wildfires"];

              return event.geometry[0] ? (
                <Marker
                  key={event.id}
                  position={[
                    event.geometry[0].coordinates[1], // Latitude
                    event.geometry[0].coordinates[0], // Longitude
                  ]}
                  icon={icon}
                >
                  <Popup>
                    <strong>{event.title}</strong> <br />
                    Category: {category}
                  </Popup>
                </Marker>
              ) : null;
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Disaster_Data;
