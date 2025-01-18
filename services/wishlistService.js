import * as wishlistDao from "../dao/wishlistDao.js";

export const getAllUserWishlist = async (userName) => {
  return wishlistDao.getAllUserWishlist(userName);
};

export const getSinglewishlist = async (wishListId) => {
  return wishlistDao.getSingleWishlist(wishListId);
};

export const addToWishList = async (wishListId, productCode) => {
  return wishlistDao.addToWishList(wishListId, productCode);
};

export const removeFromWishList = async (wishListId, productCode) => {
  return wishlistDao.removeFromWishList(wishListId, productCode);
};

export const createNewWishList = async (userName, wishListName) => {
  return wishlistDao.createNewWishList(userName, wishListName);
};

export const deleteWishList = async (wishListId) => {
  return wishlistDao.deleteWishList(wishListId);
};
