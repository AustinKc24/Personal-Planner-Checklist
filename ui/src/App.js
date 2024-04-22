import React, { useState, useEffect } from "react";
import { AddEvent } from "./components/AddEvent";
import { Event } from "./components/Event";
import axios from "axios";
import { API_URL } from "./utils";
import { Amplify } from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import config from '.amplifyconfiguration.json';

Amplify.configure(config);

function App({signOut, user}) {
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
      <>
      <div className="App">
        <AddEvent fetchEvents={fetchEvents} />
        {events.map((event) => (
          <Event event={event} key={event.id} fetchEvents={fetchEvents} />
        ))}
        <button onClick={signOut}>Sign out</button>
      </div>
        
      </>
  );
}

export default withAuthenticator(App);