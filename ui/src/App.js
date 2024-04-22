import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddEvent } from "./components/AddEvent";
import { Event } from "./components/Event";
import axios from "axios";
import { API_URL } from "./utils";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

export default function App() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddEvent fetchEvents={fetchEvents} />
      {events.map((event) => (
        <Event event={event} key={event.id} fetchEvents={fetchEvents} />
      ))}
    </ThemeProvider>
  );
}