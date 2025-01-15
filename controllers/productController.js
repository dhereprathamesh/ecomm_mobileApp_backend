import * as productService from "../services/productService.js";

// Controller to create new product
export const createProductController = async (req, res) => {
  const {
    productCode,
    productName,
    productDescription,
    productPrice,
    category,
    subCategory,
    brand,
    availableStock,
  } = req.body;
  // const { productImage } = req.files;
  try {
    const result = await productService.createProduct({
      productCode,
      productName,
      productDescription,
      productPrice,
      category,
      subCategory,
      brand,
      availableStock,
      // productImage,
    });
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get single product
export const getSingleProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productService.getProductById(id);

    if (result.success) {
      return res.status(200).json(result); // Respond with success
    } else {
      return res.status(400).json(result); // Handle error
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller to get All Products
export const getAllProductsController = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller to search products by filters
export const searchProductsByFilterController = async (req, res) => {
  const filters = req.body;

  try {
    const result = await productService.searchProductsByFilter(filters);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller to search products based on a query
export const searchProductsByQuerryController = async (req, res) => {
  const { query } = req.params; // Get the search query from URL params
  try {
    const result = await productService.searchProductsByQuerry(query);
    if (result.success) {
      return res.status(200).json(result); // Send filtered products as response
    } else {
      return res.status(400).json(result); // Handle any error
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller to update products
export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  updateData.productId = id;
  try {
    const result = await productService.updateProduct(updateData);
    if (result.success) {
      return res.status(result.status).json(result); // Send success response
    } else {
      return res.status(result.status).json(result); // Send error response
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete product
export const deleteProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productService.deleteProduct(id); // Pass the ID to deleteProduct function

    if (result.success) {
      return res.status(200).json(result); // Respond with success
    } else {
      return res.status(400).json(result); // Handle error
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
