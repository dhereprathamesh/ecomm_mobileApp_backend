import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  categoryName: { type: String, required: true },
  subCategories: [
    {
      subCategoryId: { type: String },
      subCategoryName: { type: String },
      category: { type: String },
    },
  ],
});

export const Category = mongoose.model("Category", categorySchema);
