import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  categoryName: { type: String, required: true },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
});

export const Category = mongoose.model("Category", categorySchema);
