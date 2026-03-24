import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { createApplication, getApplications } from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Setup Cloudinary config manually inside the file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup Storage with a check to prevent crashing
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kgbi_applications',
    allowed_formats: ['jpg', 'png', 'pdf', 'jpeg'],
    resource_type: 'auto', // Important for PDF support
  },
});

const upload = multer({ storage });

router.post("/create", (req, res, next) => {
  // Manual check to give a better error message if keys are still missing
  if (!process.env.CLOUDINARY_API_KEY) {
    return res.status(500).json({ message: "Cloudinary keys are missing on the server." });
  }
  next();
}, upload.single('document'), createApplication);

router.get("/", protect, getApplications);

export default router;
