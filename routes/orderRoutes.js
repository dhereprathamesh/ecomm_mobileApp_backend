import express from "express";

const router = express.Router();

router.get("/getOrders");
router.get("/getOrdersForCustomer");
router.get("/getUserOrder");
router.post("/placeOrder");
router.get("/getorderByDateRange");

export default router;
