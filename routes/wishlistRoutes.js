import express from "express";
import {
  addToWishListController,
  createWishListController,
  deleteWishListController,
  getSingleWishListController,
  getWishListForUserController,
  removeFromWishListController,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/getWishListForUser/:userName", getWishListForUserController);
router.get(
  "/getSingleWishListForUser/:wishListId",
  getSingleWishListController
);
router.post("/addToWishList", addToWishListController);
router.delete(
  "/removeFromWishList/:wishListId/:productCode",
  removeFromWishListController
);
router.post("/createWishList", createWishListController);
router.delete("/deleteWishList/:wishListId", deleteWishListController);

export default router;
