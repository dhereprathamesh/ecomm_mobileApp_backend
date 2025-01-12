import express from "express";
import { getAllCategory } from "../controllers/categoryController.js";
import { getAllSubCategory } from "../controllers/subCategoriesController.js";

const router = express.Router();

router.post("/add-product");
router.put("/update-product");
router.delete("/delete-product");
router.get("/getProduct");
router.post("/add-bulkProducts");
router.get("/getAllProducts");
router.get("/getAllCategories", getAllCategory);
router.get("/getSubCategories", getAllSubCategory);
router.get("/searchProduct");
router.post("/searchProductsByFilter");

export default router;
