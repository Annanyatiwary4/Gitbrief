// routes/prSummary.js
import express from "express";
import axios from "axios";
import { requireGithub } from "../middleware/authmiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GET PR Summary
router.get("/repos/:owner/:repo/pull-requests/:prNumber/summary", requireGithub, async (req, res) => {
  const { owner, repo, prNumber } = req.params;

  try {
    // 1. Fetch PR commits
    const commitsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );

    // 2. Fetch PR files
    const filesRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );

    const commits = commitsRes.data;
    const files = filesRes.data;

    // Collect stats
    const stats = {
      filesChanged: files.length,
      linesAdded: files.reduce((sum, f) => sum + f.additions, 0),
      linesRemoved: files.reduce((sum, f) => sum + f.deletions, 0),
      commits: commits.length,
      fileChanges: files.map((f) => ({
        filename: f.filename,
        additions: f.additions,
        deletions: f.deletions,
      })),
    };

    // 3. AI Prompt (force JSON)
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const prompt = `
You are analyzing a GitHub Pull Request. 
Return ONLY valid JSON with this schema (no markdown, no extra text):

{
  "stats": {
    "filesChanged": ${stats.filesChanged},
    "linesAdded": ${stats.linesAdded},
    "linesRemoved": ${stats.linesRemoved},
    "commits": ${stats.commits}
  },
  "dependencies": [
    { "name": "dependency-name", "from": "x.y.z", "to": "a.b.c", "risk": "Major | Minor | Patch" }
  ],
- "from" is the old version, "to" is the new version.  
- "risk" is based on semantic versioning:
  - Major if the first digit changed (breaking changes).  
  - Minor if the middle digit changed.  
  - Patch if only the last digit changed.  
- Do not include unrelated files, only dependencies.


  "categories": ["Feature: ...", "Refactor: ...", "Config Change: ..."],
  "files": [
    { "path": "src/example/File.java", "added": 10, "removed": 2 }
  ],
  "riskScore": 0-100,
  "actions": ["Export Summary PDF", "Send to Slack"]
}

--- DATA ---

FILES CHANGED:
${stats.fileChanges.map(f => `${f.filename} (+${f.additions}, -${f.deletions})`).join("\n")}

COMMITS:
${commits.map(c => `- ${c.commit.message}`).join("\n")}
    `;

    const result = await model.generateContent(prompt);
     let summaryJson;
    try {
      let rawText = result.response.text();

      // 🚀 Remove markdown code fences if AI adds ```json ... ```
      rawText = rawText.replace(/```json\n?/g, "").replace(/```/g, "").trim();

      summaryJson = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse AI response:", result.response.text());
      return res.status(500).json({ error: "AI did not return valid JSON" });
    }


    // ✅ Final response: directly return parsed JSON plus PR number
    res.json({
      prNumber,
      ...summaryJson,
    });

  } catch (err) {
    console.error("PR Summary Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate PR summary" });
  }
});

export default router;
