import { Product } from "../models/productModal.js";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";

export const createProduct = async (userData) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      category,
      subCategory,
      availableStock,
      productCode,
      brand,
    } = userData;

    // Validation
    if (!productName) throw new Error("Product Name is required");
    if (!productPrice) throw new Error("Product Price is required");
    if (!category) throw new Error("Category is required");
    if (!availableStock) throw new Error("Available Stock is required");

    // Create new product instance
    const newProduct = new Product({
      productCode,
      productName,
      productDescription,
      productPrice,
      category,
      subCategory,
      availableStock,
      brand,
    });

    // Save product
    await newProduct.save();

    return {
      success: true,
      message: "Product created successfully",
      product: newProduct,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error creating product",
    };
  }
};

//get Single Product
export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }
    return {
      success: true,
      product,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error retrieving product",
    };
  }
};

//get ALL Product
export const getAllProducts = async () => {
  try {
    const products = await Product.find(); // Fetch all products
    return {
      success: true,
      products, // Return the list of products
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error retrieving products",
    };
  }
};

// Search products by filter
export const searchProductsByFilter = async (filters) => {
  try {
    const products = await Product.find(filters);
    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error searching products",
    };
  }
};

// Search products by querry
export const searchProductsByQuerry = async (query) => {
  try {
    // Perform a case-insensitive search for the query in productName or productDescription
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: "i" } }, // Search in productName
        { productDescription: { $regex: query, $options: "i" } }, // Search in productDescription
      ],
    });

    if (products.length === 0) {
      return {
        success: false,
        message: "No products found for the given query",
      };
    }

    return {
      success: true,
      products, // Return the found products
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error searching products",
    };
  }
};

// Controller to search products based on a query
export const searchProductsByFilterController = async (req, res) => {
  const { query } = req.params; // Get the search query from URL params
  try {
    const result = await productService.searchProductsByFilter(query);
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

export const updateProduct = async (updateData) => {
  try {
    const { productId } = updateData; // Get productId from updateData

    if (!productId) throw new Error("Product ID is required");

    // Find the product by productId
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // Use the productId from URL
      { $set: updateData }, // Update only the provided fields
      { new: true, runValidators: true } // Return updated doc and run validation
    );

    if (!updatedProduct) throw new Error("Product not found");

    return {
      success: true,
      status: 200,
      message: "Product updated successfully",
      updatedProduct,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 400,
      message: error.message || "Error updating product",
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    if (!id) throw new Error("Product ID is required");

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Product not found");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error deleting product",
    };
  }
};

export const bulkUploadProducts = async (file) => {
  if (!file) {
    return {
      success: false,
      status: 400,
      message: "No file provided for upload.",
    };
  }

  const filePath = file.path;
  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  let productData = [];

  try {
    if (fileExtension === "csv") {
      const rows = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row) => rows.push(row))
          .on("end", () => resolve(rows))
          .on("error", (err) => reject(err));
      });
      productData = rows;
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      productData = xlsx.utils.sheet_to_json(sheet);
    } else {
      return {
        success: false,
        status: 400,
        message: "Invalid file format. Only CSV and Excel are supported.",
      };
    }

    // Save parsed data to the database
    const saveResult = await saveProductsToDB(productData);
    return saveResult;
  } catch (error) {
    console.error("Error in bulkUploadProducts:", error);
    return {
      success: false,
      status: 500,
      message: "Error processing file upload.",
    };
  }
};

const saveProductsToDB = async (productData) => {
  try {
    const products = productData.map((item) => ({
      productCode: item.productCode,
      productName: item.productName,
      productDescription: item.productDescription,
      productPrice: item.productPrice,
      category: item.category,
      subCategory: item.subCategory,
      availableStock: item.availableStock,
      brand: item.brand,
    }));

    await Product.insertMany(products);
    return {
      success: true,
      status: 200,
      message: `${products.length} products uploaded successfully.`,
    };
  } catch (error) {
    console.error("Error saving products to database:", error);
    return {
      success: false,
      status: 500,
      message: "Error saving products to the database.",
    };
  }
};