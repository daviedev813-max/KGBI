import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import applicationRoutes from "./routes/applicationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); // 1. INITIALIZE APP FIRST

// 2. DATABASE CONNECTION
connectDB();

// 3. CORS CONFIGURATION
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://kenyagracebibleinstitute.vercel.app",
  "http://localhost:5173", 
  "http://localhost:3000"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin || origin.endsWith(".vercel.app");
    });
    isAllowed ? callback(null, true) : callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 4. MIDDLEWARE
app.use(express.json());

// Note: Local uploads won't work on Vercel. Consider Cloudinary/AWS S3 for production.
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// 5. API ROUTES
app.get("/", (req, res) => {
  res.json({
    status: "Operational",
    system: "kenyagracebibleinstitute-backend",
    version: "2026.1"
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// 6. ERROR HANDLERS
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
