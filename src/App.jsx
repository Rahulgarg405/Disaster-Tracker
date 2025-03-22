import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Disaster_Data from "./components/Disaster_Data";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
      <div className="flex justify-between">
        <h1 className="text-3xl font-mono ">
          🌍 Live Disaster Tracker: Real-Time Global Events from the Last 15
          Days 🚨
        </h1>
        <div className="top-1 right-2 flex">
          <a
            href="https://github.com/Rahulgarg405"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-gray-800 text-3xl hover:text-gray-600 transition m-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-garg-210778257"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-600 text-3xl hover:text-blue-400 transition" />
          </a>
        </div>
      </div>

      <div style={{ width: "100%", height: "70vh", position: "relative" }}>
        <Disaster_Data events={events} />
      </div>
    </div>
  );
}

export default App;
