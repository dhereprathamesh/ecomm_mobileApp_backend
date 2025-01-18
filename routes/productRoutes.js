import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/categoryController.js";
import {
  createSubCategory,
  getAllSubCategory,
} from "../controllers/subCategoriesController.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  searchProductsByFilterController,
  searchProductsByQuerryController,
  updateProductController,
} from "../controllers/productController.js";
import { bulkUploadProductsController } from "../controllers/productController.js";
import { upload } from "../utlis/fileUpload.js";

const router = express.Router();

router.post("/add-product", createProductController);
router.put("/update-product/:id", updateProductController);
router.delete("/delete-product/:id", deleteProductController);
router.get("/get-product/:id", getSingleProductController);
router.post(
  "/add-bulkProducts",
  upload.single("file"),
  bulkUploadProductsController
);
router.get("/getAllProducts", getAllProductsController);
router.get("/searchProduct/:query", searchProductsByQuerryController);
router.post("/searchProductsByFilter", searchProductsByFilterController);

// Category Routes
router.post("/create-category", createCategory);
router.post("/create-subCategory", createSubCategory);
router.get("/getAllCategories", getAllCategory);
router.get("/getSubCategories", getAllSubCategory);
export default router;
