import * as subCatergoryService from "../services/subCategories.js";

export const getAllSubCategory = async (req, res) => {
  try {
    const response = await subCatergoryService.getAllSubCategory(req, res);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
