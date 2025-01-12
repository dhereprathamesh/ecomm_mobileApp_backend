import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  productImage: { data: Buffer, type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  availableStock: { type: Number, required: true },
  brand: { type: String },
});

export const Product = mongoose.model("Product", productSchema);
