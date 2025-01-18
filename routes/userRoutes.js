import express from "express";
import {
  getCustomersController,
  searchCustomerController,
  updateCustomerInfoController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/getCustomers", getCustomersController);
router.post("/updateCustomerInfo", updateCustomerInfoController);
router.get("/searchCustomer", searchCustomerController);

export default router;

//user role crd
