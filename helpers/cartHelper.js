import { Cart } from "../models/cartModal.js";
import { Product } from "../models/productModal.js";

// Helper function to check if a product exists
export const findProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  return product;
};

// Helper function to find or create a user's cart
export const findOrCreateCart = async (user, product, quantity) => {
  let cart = await Cart.findOne({ user: user });

  if (!cart) {
    const newCart = new Cart({
      user: user,
      cartAmount: product.productPrice * quantity,
      cartEntries: [],
      userName: user.userName,
    });

    // Save and return new cart
    await newCart.save();
    return newCart;
  }

  return cart;
};
