import express from "express";
import {
  auth,
  login,
  logout,
  profile,
  signup,
} from "../controllers/user.controller.js";
const router = express.Router();

import verifyToken from "../middlewares/verifyToken.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, profile);
router.get("/ping", async (req, res) => {
  return res.status(200).json("response ok");
});

router.get("/me", verifyToken, auth);

export default router;
