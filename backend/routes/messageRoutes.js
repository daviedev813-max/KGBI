import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/create", createMessage);

// Admin only
router.get("/all", protect, getMessages);

export default router;