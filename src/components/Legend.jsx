import React, { useState } from "react";
import "../index.css";

const legendData = [
  { icon: "🔥", label: "Wildfires", color: "red" },
  { icon: "⛈️", label: "Severe Storms", color: "blue" },
  { icon: "🌍", label: "Earthquakes", color: "brown" },
  { icon: "❄️", label: "Sea & Lake Ice", color: "lightblue" },
  { icon: "🌋", label: "Volcanoes", color: "red" },
];

const Legend = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="legend-container">
      <button
        className="legend-toggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide Legend ❌" : "Show Legend 📌"}
      </button>

      {isVisible && (
        <div className="legend">
          <h3>Disaster Legend</h3>
          {legendData.map((item, index) => (
            <div key={index} className="legend-item">
              <span className="legend-icon" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Legend;
