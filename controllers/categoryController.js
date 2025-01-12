import * as catergoryService from "../services/catergoryService.js";

export const getAllCategory = async (req, res) => {
  try {
    const response = await catergoryService.getAllCategory(req, res);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
