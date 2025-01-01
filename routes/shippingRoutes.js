import express from "express";

const router = express.Router();

router.get("/getShippingDetailsForCustomer");
router.post("/addShippingAddress");
router.put("/updateShippingAddress");
router.delete("/removeShippingAddress");

export default router;
