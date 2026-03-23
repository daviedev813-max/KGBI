import express from 'express';
import multer from 'multer';
import { createApplication, getApplications } from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ⚙️ Multer Configuration (Saves to an 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Apply the 'upload.single' middleware to the POST route
// The key 'document' must match the key used in your frontend FormData
router.post("/create", upload.single('document'), createApplication);
router.get("/",protect, getApplications);

export default router;
