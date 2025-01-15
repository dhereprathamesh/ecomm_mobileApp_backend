import * as productDao from "../dao/productDao.js";

export const createProduct = async (userData) => {
  return productDao.createProduct(userData);
};

export const getProductById = async (id) => {
  return productDao.getProductById(id);
};

export const getAllProducts = async () => {
  return productDao.getAllProducts();
};

export const searchProductsByFilter = async (filters) => {
  return productDao.searchProductsByFilter(filters);
};

export const searchProductsByQuerry = async (filters) => {
  return productDao.searchProductsByQuerry(filters);
};

export const updateProduct = async (userData) => {
  return productDao.updateProduct(userData);
};

export const deleteProduct = async (id) => {
  return productDao.deleteProduct(id);
};

export const bulkUploadProducts = async (file) => {
  return productDao.bulkUploadProducts(file);
};
