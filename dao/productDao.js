import { Product } from "../models/productModal";

export const createProduct = async (userData) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productImage,
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
    if (productImage && productImage.size > 1000000) {
      throw new Error("Product Image should be less than 1MB");
    }

    // Check if category exists
    // const existingCategory = await Category.findById(category);
    // if (!existingCategory) throw new Error("Invalid Category ID");

    // // Check if subcategory exists (if provided)
    // if (subCategory) {
    //   const existingSubCategory = await SubCategory.findById(subCategory);
    //   if (!existingSubCategory) throw new Error("Invalid SubCategory ID");
    // }

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

    // Add image data if provided
    if (productImage) {
      newProduct.productImage.data = fs.readFileSync(productImage.path);
      newProduct.productImage.type = productImage.type;
    }

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

export const updateProduct = async (updateData) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productImage,
      category,
      subCategory,
      availableStock,
      productCode,
      brand,
      productId,
    } = updateData;

    // Validation
    if (!productId) throw new Error("Product ID is required");
    //   if (productImage && productImage.size > 1000000) {
    //     throw new Error("Product Image should be less than 1MB");
    //   }

    // Find the product to update
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    // Update fields
    if (productName) {
      product.productName = productName;
    }
    if (productDescription) {
      product.productDescription = productDescription;
    }
    if (productPrice) {
      product.productPrice = productPrice;
    }
    if (category) {
      product.category = category;
    }
    if (subCategory) {
      product.subCategory = subCategory;
    }
    if (availableStock) {
      product.availableStock = availableStock;
    }
    if (productCode) {
      product.productCode = productCode;
    }
    if (brand) {
      product.brand = brand;
    }

    // Update product image if provided
    // if (productImage) {
    //   product.productImage.data = fs.readFileSync(productImage.path);
    //   product.productImage.type = productImage.type;
    // }

    // Save the updated product
    await product.save();

    return {
      success: true,
      message: "Product updated successfully",
      product,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error updating product",
    };
  }
};

export const deleteProduct = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required");

    const product = await Product.findByIdAndDelete(productId);
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
