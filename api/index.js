import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchEvents, createEvents, updateEvents, deleteEvents } from "./event.js";

const app = express();
const port = 3001;

//Grabs body of request
app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

//Testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Fetches Events
app.get("/event", async (req, res) => {
  try {
    const events = await fetchEvents();

    res.send(events.Items);
  } catch (err) {
    res.status(400).send(`Error fetching events: ${err}`);
  }
});

//Creates Events
app.post("/event", async (req, res) => {
  try {
    const event = req.body;

    const response = await createEvents(event);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating events: ${err}`);
  }
});

//Updates Events
app.put("/event", async (req, res) => {
  try {
    const event = req.body;

    const response = await updateEvents(event);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating events: ${err}`);
  }
});

//Deletes Events
app.delete("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteEvents(id);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting events: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);