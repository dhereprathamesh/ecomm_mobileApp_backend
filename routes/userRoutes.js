import express from "express";

const router = express.Router();

router.get("/getCustomers");
router.post("/updateUserInfo");
router.get("/searchUser");

export default router;
