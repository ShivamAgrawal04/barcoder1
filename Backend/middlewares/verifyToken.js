import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js"; // 👈 Import User model

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded?.id) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await User.findById(decoded.id).select("-password"); // 👈 Fetch full user

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user; // ✅ Now req.user has shopName, email, etc.
  next();
});

export default verifyToken;
