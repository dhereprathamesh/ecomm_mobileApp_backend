import { Category } from "../models/categoryModal.js";

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
