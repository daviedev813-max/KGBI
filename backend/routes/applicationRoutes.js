import express from 'express';
import multer from 'multer';
import path from 'path'; // Added path module
import { createApplication, getApplications } from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ⚙️ Sanitized Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 1. Get the file extension (e.g., .pdf)
    const ext = path.extname(file.originalname);
    
    // 2. Clean the name: remove extension, then replace non-alphanumeric chars with "_"
    const sanitizedName = file.originalname
      .replace(ext, "")
      .replace(/[^a-z0-9]/gi, "_") // Replaces spaces, dots, and ' with _
      .toLowerCase();

    // 3. Final name: timestamp-cleaned_name.extension
    cb(null, `${Date.now()}-${sanitizedName}${ext}`);
  }
});

const upload = multer({ storage });

// Routes
router.post("/create", upload.single('document'), createApplication);
router.get("/", protect, getApplications);

export default router;
