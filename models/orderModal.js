import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  itemCount: { type: Number, required: true },
  orderEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderEntry" }],
  orderStatus: { type: String, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
