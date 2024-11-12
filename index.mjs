import express from "express";
import mongoose from "mongoose";

const PORT = 3000;
const app = express();

import Grade from "./models/grades.mjs";
import GradeAgg from "./models/grades_agg.mjs";

app.use(express.json());

// Connect to Mongoose.
// Note you must specify the database you want to connect to.
// This defaults to the "test" database.
await mongoose.connect("mongodb+srv://soodala78:1972And78@mongopractice.g7ss4.mongodb.net/sample_training");

const newDoc = new Grade({
  learner_id: 2,
  class_id: 213,
  scores: [{ type: "exam", score: 50 },
           { type: "quiz", score: 60 },
           { type: "homework", score: 70 },
           { type: "homework", score: 80 },
  ],
});

async () => {
  await newDoc.save();
};

app.get("/", (req, res) => {
  res.send("ALAB 319.5 - Working with Mongoose.");
});

// Get a single grade entry
app.get("/grades/:id", async (req, res) => {
  try {
    let result = await Grade.findById(req.params.id);
    res.send(result);
  } catch {
    res.send("Invalid ID").status(400);
  }
});

// Create a single grade entry
app.post("/", async (req, res) => {
  let collection = await db.collection("grades");
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
}); 

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
