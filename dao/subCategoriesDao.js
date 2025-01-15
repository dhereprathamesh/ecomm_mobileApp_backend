import { generateSubCategoryId } from "../helpers/categoryHelper.js";
import { Category } from "../models/categoryModal.js";
import { SubCategory } from "../models/subCategories.js";

// get All Categories List
export const getAllSubCategory = async (req, res) => {
  try {
    const category = await SubCategory.find({});
    res.status(200).send({
      success: true,
      message: "All Sub Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      error,
      message: "Error while getting all Sub Categories",
    });
  }
};

export const createSubCategory = async (categoryId, subCategoryName) => {
  try {
    if (!subCategoryName) throw new Error("Sub Category Name is required");
    if (!categoryId) throw new Error("Category Id is required");

    // Find the category
    const categoryExists = await Category.findOne({ categoryId });
    if (!categoryExists) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Category not found.",
        },
      };
    }

    // Generate a new subCategoryId
    const newSubCategoryId = await generateSubCategoryId();

    // Save the subcategory in the SubCategory collection
    const newSubCategory = new SubCategory({
      subCategoryId: newSubCategoryId,
      subCategoryName,
      category: categoryExists.categoryName,
    });
    await newSubCategory.save();

    // Add the subcategory to the Category's subCategories array
    categoryExists.subCategories.push({
      subCategoryId: newSubCategoryId,
      subCategoryName,
      category: categoryExists.categoryName,
    });
    await categoryExists.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "Sub Category Created Successfully.",
        newSubCategory,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error creating sub category",
    };
  }
};
