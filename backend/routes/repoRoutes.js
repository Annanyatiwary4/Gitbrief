import express from "express";
import axios from "axios";
import { requireGithub } from "../middleware/authmiddleware.js";

const router = express.Router();

// GET /api/repos
router.get("/repos", requireGithub, async (req, res) => {
  try {
    const response = await axios.get(
      // tweak params if needed (visibility, pagination, etc.)
      "https://api.github.com/user/repos?per_page=100&sort=updated",
      {
        headers: {
          Authorization: `Bearer ${req.ghToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      visibility: repo.private ? "Private" : "Public",
      language: repo.language,
      url: repo.html_url,
    }));

    res.json(repos);
  } catch (err) {
    console.error("Repo fetch error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

export default router;
