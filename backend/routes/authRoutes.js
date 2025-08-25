import express from "express";
import axios from "axios";
import User from "../models/users.js";

const router = express.Router();

/**
 * Step 1: Redirect user to GitHub authorize page
 */
router.get("/github", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    scope: "read:user user:email repo",
    allow_signup: "true"
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

/** Step 2: callback -> exchange code -> save token -> set cookie -> redirect */
router.get("/github/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("Missing code");

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.CALLBACK_URL
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) {
      return res.status(401).send("Failed to get access token");
    }

        // fetch user profile (and emails)
    const [userRes, emailRes] = await Promise.all([
      axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` }
      }),
      axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    ]);

    const gh = userRes.data;
    const emails = emailRes.data || [];
    const primaryEmail =
      emails.find((e) => e.primary && e.verified)?.email ||
      emails.find((e) => e.verified)?.email ||
      null;

    
    // upsert user + store token
    let user = await User.findOne({ githubId: String(gh.id) });
    if (!user) {
      user = await User.create({
        githubId: String(gh.id),
        username: gh.login,
        name: gh.name || gh.login,
        email: primaryEmail,
        avatarUrl: gh.avatar_url,
        githubToken: accessToken
      });
    } else {
      // optional: keep profile fresh
      user.username = gh.login;
      user.name = gh.name || gh.login;
      user.email = user.email || primaryEmail;
      user.avatarUrl = gh.avatar_url;
      user.githubToken = accessToken; // ⬅️ refresh token
      await user.save();
    }

     // set GitHub token in HttpOnly cookie
    res.cookie("gh_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
     

     // (optional) set a lightweight "uid" cookie to identify user record quickly
    res.cookie("uid", String(user._id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

        // Redirect directly to dashboard (no token in URL!)
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        } catch (err) {
            console.error("OAuth error:", err.response?.data || err.message);
            return res.redirect(`${process.env.CLIENT_URL}/auth/error`);
        }
        });

export default router;
