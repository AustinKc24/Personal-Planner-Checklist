import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateEvent = ({
  fetchEvents,
  isDialogOpen,
  setIsDialogOpen,
  event,
}) => {
  const { id, completed } = event;
  const [eventName, setEventName] = useState("");

  const handleUpdateEventName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: eventName,
        completed,
      });

      await fetchEvents();

      setEventName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Event</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Event"
          variant="outlined"
          onChange={(e) => setEventName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateEventName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};