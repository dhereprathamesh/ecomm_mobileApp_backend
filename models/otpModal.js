import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiryDate: { type: Date, required: true },
  otpCode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  valid: { type: Boolean, default: true },
});

export const OTP = mongoose.model("OTP", otpSchema);
