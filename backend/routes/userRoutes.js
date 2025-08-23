import express from "express";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    avatarUrl: req.user.avatarUrl
  });
});

export default router;
