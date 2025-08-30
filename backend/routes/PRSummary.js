import express from "express";
import axios from "axios";
import PRSummary from "../models/Summary.js";
import { requireGithub } from "../middleware/authMiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GET PR Summary
router.get("/repos/:owner/:repo/pull-requests/:prNumber/summary", requireGithub, async (req, res) => {
  const { owner, repo, prNumber } = req.params;

  try {
    // ✅ Check cache first
    const cached = await PRSummary.findOne({ repoFullName: `${owner}/${repo}`, prNumber });
    if (cached) return res.json({ prNumber, ...cached.toObject() });

    // 1️⃣ Fetch commits
    const commitsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );
    const commits = commitsRes.data;

    // 2️⃣ Fetch files
    const filesRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      { headers: { Authorization: `Bearer ${req.ghToken}` } }
    );
    const files = filesRes.data;

    // 3️⃣ Stats
    const stats = {
      filesChanged: files.length,
      linesAdded: files.reduce((sum, f) => sum + f.additions, 0),
      linesRemoved: files.reduce((sum, f) => sum + f.deletions, 0),
      commits: commits.length,
      fileChanges: files.map(f => ({ path: f.filename, added: f.additions, removed: f.deletions })),
    };

    // 4️⃣ Risk score
    const riskScore = Math.min(
      Math.floor((stats.linesAdded + stats.linesRemoved + stats.filesChanged * 10 + stats.commits * 5) / 10),
      10
    );

    // 5️⃣ Fetch package.json dependencies (optional)
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

    // 6️⃣ AI prompt
    const prompt = `
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

    // 7️⃣ Generate AI summary
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const aiResponse = await model.generateContent(prompt);

    let summaryJson;
    try {
      let rawText = aiResponse.response.text();
      rawText = rawText.replace(/```json\n?/g, "").replace(/```/g, "").trim();
      summaryJson = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse AI response:", aiResponse.response.text());
      return res.status(500).json({ error: "AI did not return valid JSON" });
    }

    // ✅ Normalize dependencies: ensure array of objects
   const normalizedDeps = (summaryJson.dependencies || []).map(dep => {
  // If AI returned an invalid risk, default to "Minor"
  const risk = ["Patch", "Minor", "Major"].includes(dep.risk) ? dep.risk : "Minor";
      return {
        name: dep.name || "",
        from: dep.from || "",
        to: dep.to || "",
        risk,
        potentialIssues: dep.potentialIssues || [],
      };
    });


    // ✅ Normalize files
    const filesToSave = (summaryJson.files || stats.fileChanges).map(f =>
      typeof f === "string" ? { path: f, added: 0, removed: 0 } : f
    );

  const summaryText = summaryJson.summary || `PR #${prNumber} has ${stats.commits} commits and ${stats.filesChanged} changed files.`;


    // 8️⃣ Save to DB
    const saved = await PRSummary.create({
      repoFullName: `${owner}/${repo}`,
      prNumber,
      summary: summaryText,
      stats,
      dependencies: normalizedDeps,
      categories: summaryJson.categories || [],
      files: filesToSave,
      riskScore: summaryJson.riskScore ?? riskScore,
    });

    res.json({ prNumber, ...saved.toObject() });
  } catch (err) {
    console.error("PR Summary Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate PR summary" });
  }
});

export default router;
