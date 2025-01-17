import * as wishlistService from "../services/wishlistService.js";

// Get default wishlist for a user
export const getWishListForUserController = async (req, res) => {
  try {
    const userName = req.params;

    const wishlist = await wishlistService.getAllUserWishlist(
      userName.userName
    );

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get default wishlist for a user
export const getSingleWishListController = async (req, res) => {
  try {
    const { wishListId } = req.params;

    const wishlist = await wishlistService.getSinglewishlist(wishListId);

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to wishlist
export const addToWishListController = async (req, res) => {
  try {
    const { wishListId, productCode } = req.body;
    const updatedWishlist = await wishlistService.addToWishList(
      wishListId,
      productCode
    );
    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from wishlist
export const removeFromWishListController = async (req, res) => {
  try {
    const { wishListId, productCode } = req.params;
    const updatedWishlist = await wishlistService.removeFromWishList(
      wishListId,
      productCode
    );
    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new wishlist
export const createWishListController = async (req, res) => {
  try {
    const { userName, wishListName } = req.body;
    const newWishlist = await wishlistService.createNewWishList(
      userName,
      wishListName
    );
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a wishlist
export const deleteWishListController = async (req, res) => {
  try {
    const { wishListId } = req.params;
    await wishlistService.deleteWishList(wishListId);
    res.status(200).json({ message: "Wishlist deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
