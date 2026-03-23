import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token in headers
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Get token from string "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from the database (excluding password for safety)
      req.admin = await Admin.findById(decoded.id).select("-password");

      // Move to the next middleware or controller
      return next(); 
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 2. If no token was found at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

export default protect;
