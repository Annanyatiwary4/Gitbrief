import express from "express";
import axios from "axios";
import { requireGithub } from "../middleware/authMiddleware.js";

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


// GET PRs for a repo
router.get("/repos/:owner/:repo/pull-requests", requireGithub, async (req, res) => {
  const { owner, repo } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=50`,
      {
        headers: {
          Authorization: `Bearer ${req.ghToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    // Map PRs into simplified format
    const prs = response.data.map((pr) => ({
      id: pr.number,
      title: pr.title,
      contributor: pr.user?.login,
      status: pr.merged_at ? "merged" : pr.state, // GitHub returns "open"/"closed" — we detect merged explicitly
      riskScore: Math.floor(Math.random() * 10) + 1, // 🔥 placeholder, until you add real risk logic
      url: pr.html_url,
    }));

    res.json(prs);
  } catch (err) {
    console.error("PR fetch error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch PRs" });
  }
});


export default router;
