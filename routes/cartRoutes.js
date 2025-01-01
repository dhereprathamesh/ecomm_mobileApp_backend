import express from "express";

const router = express.Router();

router.post("/addToCart");
router.get("/getUserCart");
router.put("/updateCart");
router.put("/updateCartEntry");
router.delete("/removeCartEntry");

export default router;
