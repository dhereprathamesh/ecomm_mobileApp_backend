import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryId: { type: String, unique: true },
  subCategoryName: { type: String, unique: true },
  category: { type: String, ref: "Category" },
});

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
