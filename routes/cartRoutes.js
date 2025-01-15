import express from "express";
import {
  addToCartController,
  getUserCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart", addToCartController);
router.get("/getUserCart", getUserCartController);
router.put("/updateCart/");
router.put("/updateCartEntry");
router.delete("/removeCartEntry");

export default router;
