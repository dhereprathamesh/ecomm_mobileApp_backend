import mongoose from "mongoose";

const orderEntrySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  orderQuantity: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  entryStatus: { type: String, required: true },
});

export const OrderEntry = mongoose.model("OrderEntry", orderEntrySchema);
