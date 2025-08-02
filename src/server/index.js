require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
app.use(express.json());

const uri = process.env.connectionString;
if (!process.env.connectionString) {
  throw new Error("connection string is null");
}
const client = new MongoClient(uri);

let db, eventsCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("calendarApp");
    eventsCollection = db.collection("events");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

// update an event
// Update an event by ID
app.patch("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await eventsCollection.findOneAndUpdate(
      { id: id },
      { $set: updates },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// Create a new event
app.post("/api/events", async (req, res) => {
  try {
    await eventsCollection.insertOne(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await eventsCollection.find().toArray();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Delete an event by ID
app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await eventsCollection.findOneAndDelete({ id: id });
    if (!result) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Start server after DB connects
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`📅 Calendar API listening on http://localhost:${port}`);
  });
});
