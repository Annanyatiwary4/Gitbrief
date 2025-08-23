import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String },
  email: { type: String },
  avatarUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
