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
    // 1️⃣ Fetch PR commits
    const commitsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );
    const commits = commitsRes.data;

    // 2️⃣ Fetch PR files
    const filesRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );
    const files = filesRes.data;

    // 3️⃣ Collect stats
    const stats = {
      filesChanged: files.length,
      linesAdded: files.reduce((sum, f) => sum + f.additions, 0),
      linesRemoved: files.reduce((sum, f) => sum + f.deletions, 0),
      commits: commits.length,
      fileChanges: files.map(f => ({
        path: f.filename,
        added: f.additions,
        removed: f.deletions,
      })),
    };

    // 4️⃣ Fetch both backend and frontend package.json
    const branches = ["main", `refs/pull/${prNumber}/head`];
    const pkgPaths = ["backend/package.json", "frontend/package.json"];
    const packageFiles = [];

    for (const branch of branches) {
      for (const path of pkgPaths) {
        try {
          const res = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
            { headers: { Authorization: `Bearer ${req.ghToken}` } }
          );
          const content = Buffer.from(res.data.content, "base64").toString();
          packageFiles.push({ branch, path, content: JSON.parse(content) });
        } catch (err) {
          console.warn(`Failed to fetch ${path} at ${branch}:`, err.response?.status);
        }
      }
    }

    // 5️⃣ Prepare AI prompt
    const prompt = `
You are analyzing a GitHub Pull Request with detailed dependency and code changes. 

Return ONLY valid JSON (no markdown, no extra text) with this schema:

{
  "summary": "Detailed developer-friendly summary of features, bug fixes, refactors, config changes etc.",
  "stats": {
    "filesChanged": ${stats.filesChanged},
    "linesAdded": ${stats.linesAdded},
    "linesRemoved": ${stats.linesRemoved},
    "commits": ${stats.commits}
  },
  "dependencies": [
    {
      "name": "dependency-name",
      "from": "x.y.z",
      "to": "a.b.c",
      "risk": "Major | Minor | Patch",
      "potentialIssues": ["list potential bugs or breaking changes"]
    }
  ],
  "categories": ["Feature", "Bugfix", "Refactor", "Config Change", "Performance", "Security"],
  "files": [
    { "path": "src/example/File.js", "added": 10, "removed": 2 }
  ],
  "riskScore": 0-100,
  "actions": ["Export Summary PDF", "Send to Slack"]
}

--- DATA ---
FILES CHANGED:
${stats.fileChanges.map(f => `${f.path} (+${f.added}, -${f.removed})`).join("\n")}

COMMITS:
${commits.map(c => `- ${c.commit.message}`).join("\n")}

PACKAGE FILES:
${packageFiles.map(pf => `${pf.path} @ ${pf.branch}: ${JSON.stringify(pf.content.dependencies || {})}`).join("\n")}

Analyze all dependency changes, list potential risks, breaking changes, and bugs. Generate detailed categories and riskScore based on semantic versioning and potential impact.
`;

    // 6️⃣ Generate AI summary
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    let aiResponse;
    try {
      aiResponse = await model.generateContent(prompt);
    } catch (err) {
      console.error("AI generation failed:", err);
      return res.status(500).json({ error: "AI generation failed" });
    }

    let summaryJson;
    try {
      let rawText = aiResponse.response.text();
      rawText = rawText.replace(/```json\n?/g, "").replace(/```/g, "").trim();
      summaryJson = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse AI response:", aiResponse.response.text());
      return res.status(500).json({ error: "AI did not return valid JSON" });
    }

    // 7️⃣ Return JSON
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
