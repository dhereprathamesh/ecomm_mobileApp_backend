import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  cartAmount: { type: Number, required: true },
  itemCount: { type: Number, required: true },
  cartEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartEntry" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Cart = mongoose.model("Cart", cartSchema);
