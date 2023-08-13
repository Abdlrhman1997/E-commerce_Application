import { Router } from "express";
const router = Router();
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";

router.use("/:categoryId/subcategories", subCategoryRouter);
router
  .route("/")
  .post(categoryController.addCategory)
  .get(categoryController.getAllCategories);
router
  .route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
