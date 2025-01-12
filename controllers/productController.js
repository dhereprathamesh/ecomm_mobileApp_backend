import * as productService from "../services/productService.js";

export const createProductController = async (req, res) => {
  const {
    productCode,
    productName,
    productDescription,
    productPrice,
    category,
    subCategory,
    brand,
  } = req.body;
  const { productImage } = req.files;
  try {
    const response = await productService.createProduct({
      productCode,
      productName,
      productDescription,
      productPrice,
      category,
      subCategory,
      brand,
      productImage,
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  const {
    productCode,
    productName,
    productDescription,
    productPrice,
    category,
    subCategory,
    brand,
  } = req.body;

  const { productImage } = req.files;

  const { productId } = req.params.id;
  try {
    const response = await productService.updateProduct({
      productCode,
      productName,
      productDescription,
      productPrice,
      category,
      subCategory,
      brand,
      productImage,
      productId,
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params.id;
  try {
    const response = await productService.deleteProduct(productId);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
