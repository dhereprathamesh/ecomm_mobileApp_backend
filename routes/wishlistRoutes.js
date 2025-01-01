import express from "express";

const router = express.Router();

router.get("/getDefaultWishListForUser");
router.post("/addToWishList");
router.delete("/removeFromWishList");
router.post("/createWishList");
router.delete("/deleteWishList");

export default router;
