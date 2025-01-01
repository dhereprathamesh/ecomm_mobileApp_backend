import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roleDescription: { type: String, required: true },
});

export const UserRole = mongoose.model("UserRole", userRoleSchema);
