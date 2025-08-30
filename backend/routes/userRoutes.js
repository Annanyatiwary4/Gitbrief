import express from "express";
import axios from "axios";


const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.cookies.gh_token;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const { data: gh } = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json({
      id: gh.id,
      username: gh.login,
      name: gh.name,
      avatarUrl: gh.avatar_url,
    });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
});

/** logout -> clear cookies */
router.post("/logout", (req, res) => {
  res.clearCookie("gh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("uid", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ ok: true });
});


export default router;
