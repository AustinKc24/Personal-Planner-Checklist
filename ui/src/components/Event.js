import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateEvent } from "./UpdateEvent";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Event = ({ event, fetchEvents }) => {
  const { id, name, completed } = event;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateEventCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${ API_URL }/${event.id}`);

      await fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="event">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateEventCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="eventButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteEvent}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateEvent
        fetchEvents={fetchEvents}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        event={event}
      />
    </div>
  );
};