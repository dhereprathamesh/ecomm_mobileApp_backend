import express from "express";

const router = express.Router();

router.post("/add-product");
router.put("/update-product");
router.delete("/delete-product");
router.get("/getProduct");
router.post("/add-bulkProducts");
router.get("/getAllProducts");
router.get("/getAllCategories");
router.get("/getSubCategories");
router.get("/searchProduct");
router.post("/searchProductsByFilter");

export default router;
