import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import compression from "compression"; // New: Compresses responses for speed
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import applicationRoutes from "./routes/applicationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. INITIALIZE APP
const app = express();

// 2. DATABASE CONNECTION
connectDB();

// 3. MIDDLEWARE & SECURITY
app.use(compression()); // Makes your API responses smaller/faster
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
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some((allowed) => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin || origin.endsWith(".vercel.app");
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 5. STATIC FILES & UPLOADS
// Warning: Files in /uploads are temporary on Render/Vercel.
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// 6. API ROUTES
app.get("/", (req, res) => {
  res.json({
    status: "Operational",
    system: "kenyagracebibleinstitute-backend",
    version: "2026.1",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// 7. ERROR HANDLERS
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[Error]: ${err.stack}`);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// 8. START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app; // Useful for testing or serverless environments
