import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // Added for directory paths
import fs from "fs";     // Added to handle folder creation
import { fileURLToPath } from "url"; // Required for ES Modules __dirname
import connectDB from "./config/db.js";

// Routes
import applicationRoutes from "./routes/applicationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

// 📂 SETUP UPLOADS DIRECTORY (Ensures Multer has a place to save files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Created 'uploads' directory");
}

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📎 SERVE STATIC FILES: This makes http://localhost:5000/uploads/filename.pdf accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base route
app.get("/", (req, res) => {
  res.send("KGBI API is running...");
});

// API Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error for debugging
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
