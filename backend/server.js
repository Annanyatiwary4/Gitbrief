import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";




const app = express();
connectDB();

// If you later use cookies, set { credentials: true, origin: CLIENT_URL }
app.use(cookieParser());
app.use(cors({ credentials:true ,origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
