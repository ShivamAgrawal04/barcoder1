import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default verifyToken;
