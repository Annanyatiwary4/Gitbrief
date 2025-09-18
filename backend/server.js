import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import repoRoutes from "./routes/repoRoutes.js";
import prSummaryRoutes from "./routes/PRSummary.js";
import contactRoutes from "./routes/ContactRoutes.js";




const app = express();
connectDB();


app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // must exactly match your frontend origin
    credentials: true,              // allow cookies
  })
);


// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", repoRoutes);
app.use("/api", prSummaryRoutes);
app.use("/api", contactRoutes);

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
