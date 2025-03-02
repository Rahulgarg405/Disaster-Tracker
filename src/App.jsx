import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Disaster_Data from "./components/Disaster_Data";
import "./index.css";

const API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      const allEvents = response.data.events;
      const filteredEvents = filterRecentEvents(allEvents);
      setEvents(filteredEvents);
    });
  }, []);

  function filterRecentEvents(events) {
    const now = new Date();
    const past15Days = new Date();
    past15Days.setDate(now.getDate() - 15);

    return events.filter((event) => {
      if (event.geometry.length > 0) {
        const eventDate = new Date(event.geometry[0].date);
        return eventDate >= past15Days && eventDate <= now;
      }
      return false;
    });
  }
  return (
    <div>
      <h1>
        🌍 Live Disaster Tracker: Real-Time Global Events from the Last 15 Days
        🚨
      </h1>
      <div style={{ width: "100%", height: "70vh", position: "relative" }}>
        <Disaster_Data events={events} />
      </div>
    </div>
  );
}

export default App;
