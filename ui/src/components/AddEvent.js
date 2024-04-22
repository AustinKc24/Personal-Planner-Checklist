import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddEvent = ({ fetchEvents }) => {
  const [newEvent, setNewEvent] = useState("");

  const addNewEvent = async () => {
    try {
      await axios.post(API_URL, {
        name: newEvent,
        completed: false,
      });

      await fetchEvents();

      setNewEvent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h1" paddingTop={2} paddingBottom={2}>
        Personal Planner Checklist!
      </Typography>
      <div className="addEvent">
        <TextField
          size="small"
          label="Event"
          variant="outlined"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <Button
          disabled={!newEvent.length}
          variant="outlined"
          onClick={addNewEvent}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};