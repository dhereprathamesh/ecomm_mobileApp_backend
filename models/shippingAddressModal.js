import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  shipAddressId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);
