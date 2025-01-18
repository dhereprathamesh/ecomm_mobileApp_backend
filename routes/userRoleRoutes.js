import express from "express";
import {
  createUserRoleController,
  getAllUserRolesController,
} from "../controllers/userRoleController.js";

const router = express.Router();

router.post("/create-userRole", createUserRoleController);
router.get("/getAllUserRole", getAllUserRolesController);

export default router;
