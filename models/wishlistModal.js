import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  wishListId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  wishListName: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
