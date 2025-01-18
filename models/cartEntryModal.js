import mongoose from "mongoose";

const cartEntrySchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  cartQuantity: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userName: { type: String },
});

export const CartEntry = mongoose.model("CartEntry", cartEntrySchema);
