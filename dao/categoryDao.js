import {
  generateCategoryId,
  generateSubCategoryId,
} from "../helpers/categoryHelper.js";
import { Category } from "../models/categoryModal.js";
import { SubCategory } from "../models/subCategories.js";

// get All Categories List
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      error,
      message: "Error while getting all Categories",
    });
  }
};

export const createCategory = async (categoryName) => {
  try {
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // Generate a unique categoryId
    const categoryId = await generateCategoryId();

    // Create and save the new category
    const newCategory = new Category({ categoryId, categoryName });
    await newCategory.save();

    // // const subCategories = await SubCategory.findOne({ categoryId: categoryId });
    // const newSubCategoryId = await generateSubCategoryId();

    // const newSubCategory = await SubCategory.findOne({
    //   subCategoryId: newSubCategoryId,
    // });

    // if (newSubCategory) {
    //   return {
    //     status: 404,
    //     data: { message: "Sub Category already present" },
    //   };
    // }

    // const subCategory = await new SubCategory({
    //   subCategoryId: newSubCategory,
    // }).save();

    return {
      status: 200,
      data: {
        newCategory,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create category");
  }
};
