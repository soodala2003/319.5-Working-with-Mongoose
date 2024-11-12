import express from "express";
import mongoose from "mongoose";

/**
 * It is not best practice to seperate these routes
 * like we have done here. This file was created
 * specifically for educational purposes, to contain
 * all aggregation routes in one place.
 */

/**
 * Grading Weights by Score Type:
 * - Exams: 50%
 * - Quizes: 30%
 * - Homework: 20%
 */

const gradeAggSchema = new mongoose.Schema({
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
});

// You can build indexing into your schemas.
gradeAggSchema.index({ learner_id: 1 });
gradeAggSchema.index({ class_id: 1 });
gradeAggSchema.index({ scores: 1 });

// Get the weighted average of a specified learner's grades, per class
/* router.get("/learner/:id/avg-class", async (req, res) => {
  let collection = await db.collection("grades");

  let result = await collection
    .aggregate([
      {
        $match: { learner_id: Number(req.params.id) },
      },
      {
        $unwind: { path: "$scores" },
      },
      {
        $group: {
          _id: "$class_id",
          quiz: {
            $push: {
              $cond: {
                if: { $eq: ["$scores.type", "quiz"] },
                then: "$scores.score",
                else: "$$REMOVE",
              },
            },
          },
          exam: {
            $push: {
              $cond: {
                if: { $eq: ["$scores.type", "exam"] },
                then: "$scores.score",
                else: "$$REMOVE",
              },
            },
          },
          homework: {
            $push: {
              $cond: {
                if: { $eq: ["$scores.type", "homework"] },
                then: "$scores.score",
                else: "$$REMOVE",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          class_id: "$_id",
          avg: {
            $sum: [
              { $multiply: [{ $avg: "$exam" }, 0.5] },
              { $multiply: [{ $avg: "$quiz" }, 0.3] },
              { $multiply: [{ $avg: "$homework" }, 0.2] },
            ],
          },
        },
      },
    ])
    .toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
 */
export default mongoose.model("GradeAgg", gradeAggSchema);
