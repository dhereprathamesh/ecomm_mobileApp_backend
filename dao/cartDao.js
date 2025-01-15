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
