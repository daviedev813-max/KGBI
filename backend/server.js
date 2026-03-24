// 🚨 1. THIS MUST BE THE FIRST LINE. 
// It forces environment variables to load BEFORE any other imports.
import 'dotenv/config'; 

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import compression from "compression";
import helmet from "helmet";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import applicationRoutes from "./routes/applicationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. INITIALIZE APP & DATABASE
const app = express();
connectDB();

// 3. MIDDLEWARE & SECURITY
// Setting Cross-Origin-Resource-Policy to false allows Cloudinary images to load
app.use(helmet({ crossOriginResourcePolicy: false })); 
app.use(compression()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. CORS CONFIGURATION
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://kenyagracebibleinstitute.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
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
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 5. STATIC FILES (For local fallback)
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// 6. API ROUTES
app.get("/", (req, res) => {
  res.json({
    status: "Operational",
    system: "kgbi-backend",
    version: "2026.1",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// 7. ERROR HANDLERS
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Improved Global Error Handler
app.use((err, req, res, next) => {
  console.error("--- BACKEND CRASH LOG ---");
  console.error(err); 
  console.error("-------------------------");

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// 8. START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
