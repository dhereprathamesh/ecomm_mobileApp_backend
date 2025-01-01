import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  subCategoryName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
