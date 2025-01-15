import * as cartDao from "../dao/cartDao.js";

export const addToCart = async (cartData) => {
  return cartDao.addToCart(cartData);
};

export const getUserCart = async (userName) => {
  return cartDao.getUserCart(userName);
};
