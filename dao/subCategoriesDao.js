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
