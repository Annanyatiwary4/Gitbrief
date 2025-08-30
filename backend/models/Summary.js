import mongoose from "mongoose";

const PRSummarySchema = new mongoose.Schema({
  repoFullName: { type: String, required: true }, // e.g., owner/repo
  prNumber: { type: Number, required: true },
  summary: { type: String, required: true },
  stats: {
    filesChanged: Number,
    linesAdded: Number,
    linesRemoved: Number,
    commits: Number,
  },
  dependencies: [
    {
      name: String,
      from: String,
      to: String,
      risk: { type: String, enum: ["Patch", "Minor", "Major"] },
      potentialIssues: [String],
    },
  ],
  categories: [String],
  files: [
    {
      path: String,
      added: Number,
      removed: Number,
    },
  ],
  riskScore: { type: Number, min: 0, max: 100 }, // auto-calculated
  createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 }, // optional TTL: 24h
});

PRSummarySchema.index({ repoFullName: 1, prNumber: 1 }, { unique: true });

export default mongoose.model("PRSummary", PRSummarySchema);
