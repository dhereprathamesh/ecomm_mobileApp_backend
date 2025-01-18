import { Product } from "../models/productModal.js";
import { User } from "../models/userModal.js";
import { Wishlist } from "../models/wishlistModal.js";
import mongoose from "mongoose";

// Get default wishlist for a user
export const getAllUserWishlist = async (userName) => {
  try {
    const user = await User.findOne({ userName }).select("_id userName");
    if (!user) throw new Error(`User '${userName}' not found.`);

    // Find the user's wishlists
    let wishlists = await Wishlist.find({ user: user._id }).populate(
      "products"
    );

    if (wishlists.length === 0) {
      const defaultWishlist = await Wishlist.create({
        wishListName: "Default Wishlist",
        products: [],
        user: user._id,
      });
      wishlists = [defaultWishlist];
    }

    return wishlists.map((wishlist) => ({
      wishlistName: wishlist.wishListName,
      wishlistUserName: user.userName,
      itemCount: wishlist.products.length,
      wishlistId: wishlist._id,
    }));
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error fetching or creating wishlist.");
  }
};

export const getSingleWishlist = async (wishListId) => {
  try {
    if (!wishListId) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Invalid wishlist ID format.",
        },
      };
    }

    // Find the wishlist by its ID and populate the products
    const wishlist = await Wishlist.findById(wishListId).populate("products");
    if (!wishlist) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Wishlist not found.",
        },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Wishlist fetched successfully.",
        wishlist,
      },
    };
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
    return {
      status: 500,
      data: {
        success: false,
        message: "An error occurred while fetching the wishlist.",
      },
    };
  }
};

export const addToWishList = async (wishListId, productCode) => {
  console.log(wishListId, productCode);

  try {
    // Validate the wishlist ID format
    if (!mongoose.Types.ObjectId.isValid(wishListId)) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Invalid wishlist ID format.",
        },
      };
    }

    // Step 1: Find the product by its product code
    const product = await Product.findOne({ productCode });
    if (!product) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Product not found.",
        },
      };
    }

    // Step 2: Find the wishlist by its ID
    const wishlist = await Wishlist.findById(wishListId).populate("products");
    if (!wishlist) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Wishlist not found.",
        },
      };
    }

    // Step 3: Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.products.some(
      (p) => p._id.toString() === product._id.toString()
    );
    if (isProductInWishlist) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Product is already in the wishlist.",
        },
      };
    }

    // Step 4: Add the product to the wishlist and save
    wishlist.products.push(product._id);
    await wishlist.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "Product added to wishlist successfully.",
        wishlist: {
          id: wishlist._id,
          name: wishlist.wishListName,
          products: wishlist.products,
        },
      },
    };
  } catch (error) {
    console.error("Error adding product to wishlist:", error.message);
    return {
      status: 500,
      data: {
        success: false,
        message: "An error occurred while adding the product to the wishlist.",
      },
    };
  }
};

// Remove a product from the wishlist
export const removeFromWishList = async (wishListId, productCode) => {
  try {
    // Validate the wishlist ID format

    console.log(wishListId, productCode);

    if (!mongoose.Types.ObjectId.isValid(wishListId)) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Invalid wishlist ID format.",
        },
      };
    }

    // Step 1: Find the product by its product code
    const product = await Product.findOne({ productCode });
    if (!product) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Product not found.",
        },
      };
    }

    // Step 2: Find the wishlist by its ID
    const wishlist = await Wishlist.findById(wishListId).populate("products");
    if (!wishlist) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Wishlist not found.",
        },
      };
    }

    // Step 3: Check if the product is in the wishlist
    const isProductInWishlist = wishlist.products.some(
      (p) => p._id.toString() === product._id.toString()
    );
    if (!isProductInWishlist) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Product is not in the wishlist.",
        },
      };
    }

    // Step 4: Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(
      (p) => p._id.toString() !== product._id.toString()
    );
    await wishlist.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "Product removed from wishlist successfully.",
        wishlist: {
          id: wishlist._id,
          name: wishlist.wishListName,
          products: wishlist.products,
        },
      },
    };
  } catch (error) {
    console.error("Error removing product from wishlist:", error.message);
    return {
      status: 500,
      data: {
        success: false,
        message:
          "An error occurred while removing the product from the wishlist.",
      },
    };
  }
};

// Create a new wishlist
export const createNewWishList = async (userName, wishListName) => {
  try {
    if (!userName || !wishListName) {
      return {
        status: 400,
        data: {
          success: false,
          message: "UserName or WishlistName not provided",
        },
      };
    }

    // Find the user by userName
    const user = await User.findOne({ userName }).select("_id name");
    if (!user) {
      return {
        status: 404,
        data: {
          success: false,
          message: `User with userName '${userName}' not found.`,
        },
      };
    }

    // Check if the user already has a wishlist with the same name
    const existingWishlist = await Wishlist.findOne({
      user: user._id,
      wishListName: wishListName,
    });

    if (existingWishlist) {
      // If wishlist already exists for this user, throw an error
      return {
        status: 400,
        data: {
          success: false,
          message: `Wishlist with name '${wishListName}' already exists for this user.`,
        },
      };
    }

    // Create a new wishlist if it doesn't exist
    const newWishlist = new Wishlist({
      wishListName: wishListName,
      products: [],
      user: user._id,
    });

    await newWishlist.save();

    return {
      status: 200,
      data: {
        success: true,
        message: `New wishlist '${wishListName}' created successfully.`,
        wishlistId: newWishlist._id,
      },
    };
  } catch (error) {
    console.error("Error creating wishlist:", error);
    return {
      status: 500,
      data: {
        success: false,
        message: "Error creating wishlist.",
      },
    };
  }
};

// Delete a wishlist
export const deleteWishList = async (wishListId) => {
  try {
    // Validate the wishlist ID format
    if (!mongoose.Types.ObjectId.isValid(wishListId)) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Invalid wishlist ID format.",
        },
      };
    }

    // Step 1: Find the wishlist by its ID
    const wishlist = await Wishlist.findById(wishListId);
    if (!wishlist) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Wishlist not found.",
        },
      };
    }

    // Step 2: Delete the wishlist
    await Wishlist.deleteOne({ _id: wishListId });

    return {
      status: 200,
      data: {
        success: true,
        message: "Wishlist deleted successfully.",
      },
    };
  } catch (error) {
    console.error("Error deleting wishlist:", error.message);
    return {
      status: 500,
      data: {
        success: false,
        message: "An error occurred while deleting the wishlist.",
      },
    };
  }
};
