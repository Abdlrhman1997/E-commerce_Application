import { Router } from "express";
const router = Router();
import * as categoryController from "./category.controller.js";

router.post("/addCategory", categoryController.addCategory);
router.get("/getAllCategories", categoryController.getAllCategories);
router.put("/updateCategory/:id", categoryController.updateCategory);

export default router;
