import * as categoryDao from "../dao/categoryDao.js";

export const getAllCategory = async (req, res) => {
  return categoryDao.getAllCategory(req, res);
};

export const createCategory = async (categoryName) => {
  return categoryDao.createCategory(categoryName);
};
