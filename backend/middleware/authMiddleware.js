
// read the GitHub token from HttpOnly cookie and attach to req
export const requireGithub = (req, res, next) => {
  const token = req.cookies.gh_token;
  if (!token) return res.status(401).json({ error: "Missing GitHub token" });
  req.ghToken = token;
  next();
};

