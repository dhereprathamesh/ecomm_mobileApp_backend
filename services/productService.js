import * as productDao from "../dao/productDao.js";

export const createProduct = async (userData) => {
  return productDao.createProduct(userData);
};

export const updateProduct = async (userData) => {
  return productDao.updateProduct(userData);
};

export const deleteProduct = async (productId) => {
  return productDao.deleteProduct(productId);
};
