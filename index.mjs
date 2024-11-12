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

//app.use("/grades", grades);
//app.use("/grades", grades_agg);

// Get a single grade entry
app.get("/grades/:id", async (req, res) => {
    try {
        let result = await Grade.findById(req.params.id);
        res.send(result);
    } catch {
        res.send("Invalid ID").status(400);
    }
});

/* router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
