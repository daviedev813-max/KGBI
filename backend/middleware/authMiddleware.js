import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch admin and check if they still exist in the database
      const currentAdmin = await Admin.findById(decoded.id).select("-password");

      if (!currentAdmin) {
        return res.status(401).json({ message: "Not authorized, user no longer exists" });
      }

      // Attach admin to the request object
      req.admin = currentAdmin;
      
      return next(); 
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 2. If no token was found in the header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

export default protect;
