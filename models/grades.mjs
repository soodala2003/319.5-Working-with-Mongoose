import express from "express";
import mongoose from "mongoose";
//import db from "../db/conn.mjs";
//import { ObjectId } from "mongodb";

/* const gradesSchema = new mongoose.Schema({
    learner_id: {
        type: Number,
        min: 0,
    },
    class_id: {
        type: Number,
    },
    scores: [
        { type: { type: String }, score: { type: Number } }, 
        { type: { type: String }, score: { type: Number } }, 
        { type: { type: String }, score: { type: Number } }, 
        { type: { type: String }, score: { type: Number } },
    ],
}); */

// You can build indexing into your schemas.
gradesSchema.index({ learner_id: 1 });
gradesSchema.index({ class_id: 1 });
gradesSchema.index({ scores: 1 });
//gradeSchema.index({ campus: 1 });

// You can add methods to instances of a Mongoose model,
// which is simply a document object with its own instance methods.
gradesSchema.methods.getPeers = function (cb) {
  return mongoose
    .model("Grade")
    .find({ learner_id: this.learner_id, class_id: this.class_id }, cb);
};

export default mongoose.model("Grade", gradesSchema);

//const router = express.Router();

// Create a single grade entry
/* router.post("/", async (req, res) => {
  let collection = await db.collection("grades");
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
}); */


// Add a score to a grade entry
/* router.patch("/:id/add", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: ObjectId(req.params.id) };

  let result = await collection.updateOne(query, {
    $push: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */

// Remove a score from a grade entry
/* router.patch("/:id/remove", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: ObjectId(req.params.id) };

  let result = await collection.updateOne(query, {
    $pull: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */

// Delete a single grade entry
/* router.delete("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */

// Get route for backwards compatibility
/* router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});
 */
// Get a learner's grade data
/* router.get("/learner/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };
  
  // Check for class_id parameter
  if (req.query.class) query.class_id = Number(req.query.class);

  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
 */
// Delete a learner's grade data
/* router.delete("/learner/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };

  let result = await collection.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
 */
// Get a class's grade data
/* router.get("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  // Check for learner_id parameter
  if (req.query.learner) query.learner_id = Number(req.query.learner);

  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
 */
// Update a class id
/* router.patch("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  let result = await collection.updateMany(query, {
    $set: { class_id: req.body.class_id }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */

// Delete a class
/* router.delete("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  let result = await collection.deleteMany(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}); */


