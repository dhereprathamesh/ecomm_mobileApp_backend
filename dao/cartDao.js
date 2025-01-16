import { Cart } from "../models/cartModal.js";
import { Product } from "../models/productModal.js";

import { findOrCreateCart, findProduct } from "../helpers/cartHelper.js";
import { CartEntry } from "../models/cartEntryModal.js";
import { User } from "../models/userModal.js";

// Add product to cart
export const addToCart = async (cartData) => {
  const { userName, productCode, quantity } = cartData;

  if (!userName || !productCode || !quantity) {
    throw new Error("userName, productCode, and quantity are required.");
  }

  try {
    const user = await User.findOne({ userName: userName });

    const product = await Product.findOne({ productCode: productCode }); // Check if product exists

    let cart = await findOrCreateCart(user, product, quantity); // Find or create cart

    // Check if product is already in the cart
    let existingCartEntry = await CartEntry.findOne({
      product: product,
      cart: cart,
    });

    if (existingCartEntry) {
      return {
        status: 200,
        data: {
          success: true,
          message: "Product Already added in Cart",
        },
      };
    } else {
      // Add new cart entry
      const newCartEntry = new CartEntry({
        cart: cart,
        cartQuantity: quantity,
        product: product,
        userName: user.userName,
      });

      await newCartEntry.save();
      cart.cartAmount += product.productPrice * quantity;
      cart.itemCount = cart.itemCount + 1;

      await cart.save();

      return {
        status: 200,
        data: {
          success: true,
          message: "Product added to cart.",
          cart,
        },
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error adding product to cart.");
  }
};

//get user cart
export const getUserCart = async (userName) => {
  try {
    if (!userName) {
      throw new Error("userName are required.");
    }
    const user = await User.findOne({ userName: userName });
    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({ user: user });
    if (!cart) {
      const newCart = new Cart({
        user: user,
        userName: user.userName,
      });

      // Save and return new cart
      await newCart.save();
      return {
        status: 200,
        data: {
          cartID: newCart.cartId,
          cartAmount: newCart.cartAmount,
          itemCount: newCart.itemCount,
          cartEntries: [],
        },
      };
    }

    const cartEntries = await CartEntry.find({ cart: cart });
    if (!cartEntries) {
      throw new Error("Cart not found");
    }

    return {
      status: 200,
      data: {
        cartID: cart.cartId,
        cartAmount: cart.cartAmount,
        itemCount: cart.itemCount,
        cartEntries: cartEntries,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error while getting User Cart");
  }
};

// Update cart
export const updateCart = async (cartData) => {
  const { userName, productCode, quantity, cartId } = cartData;

  if (!userName || !productCode || !quantity || !cartId) {
    throw new Error(
      "userName, productCode, quantity, and cartId are required."
    );
  }

  try {
    // Find user by userName
    const user = await User.findOne({ userName: userName });
    if (!user) {
      throw new Error("User not found.");
    }

    // Find the specific cart by cartId
    const cart = await Cart.findOne({ cartId: cartId, user: user });
    if (!cart) {
      throw new Error("Cart not found.");
    }

    // Find the product by productCode
    const product = await Product.findOne({ productCode: productCode });
    if (!product) {
      throw new Error("Product not found.");
    }

    // Find existing cart entry for this product
    let existingCartEntry = await CartEntry.findOne({
      product: product,
      cart: cart,
    });

    if (existingCartEntry) {
      // Update existing cart entry
      const oldQuantity = existingCartEntry.cartQuantity;
      const quantityDifference = quantity - oldQuantity;

      existingCartEntry.cartQuantity = quantity;
      await existingCartEntry.save();

      // Update the cart amount
      cart.cartAmount += product.productPrice * quantityDifference;

      // If quantity is changed, adjust itemCount
      if (quantityDifference !== 0) {
        cart.itemCount = cart.itemCount + (quantityDifference > 0 ? 1 : -1);
      }

      await cart.save();

      return {
        status: 200,
        data: {
          success: true,
          message: "Cart updated successfully.",
          cart,
        },
      };
    } else {
      // If cart entry does not exist, add new entry
      const newCartEntry = new CartEntry({
        cart: cart,
        cartQuantity: quantity,
        product: product,
        userName: user.userName,
      });

      await newCartEntry.save();
      cart.cartAmount += product.productPrice * quantity;
      cart.itemCount = cart.itemCount + 1;

      await cart.save();

      return {
        status: 200,
        data: {
          success: true,
          message: "Product added to cart.",
          cart,
        },
      };
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    throw new Error("Error updating cart.");
  }
};

export const clearCart = async (cartId) => {
  try {
    if (!cartId) throw new Error("Cart ID is required.");

    // Find the cart by cartId
    const cart = await Cart.findOne({ cartId });
    if (!cart) throw new Error("Cart not found.");

    // Remove all associated cart entries
    await CartEntry.deleteMany({ cart: cart._id });

    // Reset the cart's amount and item count
    cart.cartAmount = 0;
    cart.itemCount = 0;
    await cart.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "All cart entries deleted successfully, cart is still intact.",
        cart,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error removing cart entries.",
    };
  }
};

export const removeCartEntry = async (cartEntryId) => {
  try {
    if (!cartEntryId) throw new Error("Cart Entry ID is required.");

    const cartEntry = await CartEntry.findById(cartEntryId);
    if (!cartEntry) throw new Error("Cart entry not found.");

    const cart = await Cart.findById(cartEntry.cart);
    if (!cart) throw new Error("Cart not found.");

    await CartEntry.findByIdAndDelete(cartEntryId);

    await cart.save();
    return {
      success: true,
      message: "Cart entry removed successfully.",
      cart,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Error removing cart entry.",
    };
  }
};
