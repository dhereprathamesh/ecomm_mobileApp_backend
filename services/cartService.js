import * as cartDao from "../dao/cartDao.js";

//add to cart
export const addToCart = async (cartData) => {
  return cartDao.addToCart(cartData);
};

//get user cart
export const getUserCart = async (userName) => {
  return cartDao.getUserCart(userName);
};

// Update cart
export const updateCart = async (cartData) => {
  return cartDao.updateCart(cartData);
};

// clear cart
export const clearCart = async (cartId) => {
  return cartDao.clearCart(cartId);
};

// Remove cart entry
export const removeCartEntry = async (cartEntryId) => {
  return cartDao.removeCartEntry(cartEntryId);
};
