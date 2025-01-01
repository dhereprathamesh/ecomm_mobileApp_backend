import express from "express";
import { signIn, signUp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

// Auth Routes
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/verifyOtp", verifyOtp);
router.post("/reset-password");
router.post("/change-password");

export default router;
