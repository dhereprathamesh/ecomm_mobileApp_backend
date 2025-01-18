import express from "express";
import {
  addToCartController,
  clearCartController,
  getUserCartController,
  removeCartEntryController,
  updateCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart", addToCartController);
router.get("/getUserCart", getUserCartController);
router.put("/updateCart/:cartId", updateCartController);
router.delete("/clearCart/:cartId", clearCartController);
router.delete("/removeCartEntry/:cartEntryId", removeCartEntryController);

export default router;
