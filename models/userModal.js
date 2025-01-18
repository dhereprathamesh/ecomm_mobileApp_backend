import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, ref: "UserRole" },
  mobileNo: { type: String },
  isActive: { type: Boolean, default: false },
  // otp: { type: String },
  // otpExpires: { type: Date },
});

export const User = mongoose.model("User", userSchema);
