import express from "express";
import {
  resendOtp,
  signIn,
  signUp,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

// Auth Routes
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);
router.post("/reset-password");
router.post("/change-password");

export default router;
