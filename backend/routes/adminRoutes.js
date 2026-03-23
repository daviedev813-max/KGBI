import express from "express";
import {
  registerAdmin,
  loginAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// TEMPORARY (delete later)
router.post("/register", registerAdmin);

// Permanent
router.post("/login", loginAdmin);

export default router;