import { Category } from "../models/categoryModal.js";
import { SubCategory } from "../models/subCategories.js";

export const generateCategoryId = async () => {
  // Find the latest category and sort by categoryId in descending order
  const latestCategory = await Category.findOne()
    .sort({ categoryId: -1 })
    .exec();

  // Extract the numeric part from the last categoryId and increment it
  const lastIdNumber = latestCategory
    ? parseInt(latestCategory.categoryId.replace("CAT", ""))
    : 0;
  const newIdNumber = lastIdNumber + 1;

  // Format the new categoryId as "CATXXX"
  return `CAT${String(newIdNumber).padStart(3, "0")}`;
};

export const generateSubCategoryId = async () => {
  // Find the latest category and sort by categoryId in descending order
  const latestSubCategory = await SubCategory.findOne()
    .sort({ subCategoryId: -1 })
    .exec();

  // Extract the numeric part from the last categoryId and increment it
  const lastIdNumber = latestSubCategory
    ? parseInt(latestSubCategory.subCategoryId.replace("SUB", ""))
    : 0;
  const newIdNumber = lastIdNumber + 1;

  // Format the new categoryId as "CATXXX"
  return `SUB${String(newIdNumber).padStart(3, "0")}`;
};
