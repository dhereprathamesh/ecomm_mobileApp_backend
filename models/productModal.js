import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String },
    productPrice: { type: Number, required: true },
    productImage: { data: Buffer, type: String },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    availableStock: { type: Number, required: true, default: 0 },
    brand: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
