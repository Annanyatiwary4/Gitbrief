import express from "express";
import { sendMail } from "../utils/mailer.js";


const router = express.Router();

// simple email regex
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validation checks
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Name is required and must be at least 2 characters." });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "A valid email is required." });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: "Message must be at least 10 characters long." });
    }

    // send email
    await sendMail({ name, email, message });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

export default router;
