import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  cartAmount: { type: Number, required: true, default: 0 },
  itemCount: { type: Number, required: true, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
});

export const Cart = mongoose.model("Cart", cartSchema);
