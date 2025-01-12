import * as subCategoryDao from "../dao/subCategoriesDao.js";

export const getAllSubCategory = async (req, res) => {
  return subCategoryDao.getAllSubCategory(req, res);
};
