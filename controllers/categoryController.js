import * as categoryService from "../services/categoryService.js";

export const getAllCategory = async (req, res) => {
  try {
    const response = await categoryService.getAllCategory(req, res);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const response = await categoryService.createCategory(categoryName);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
