import { Router } from "express";
const router = Router();
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import validate from "../../middleware/validation.js";
import {
  addCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";

router.use("/:categoryId/subcategories", subCategoryRouter);
router
  .route("/")
  .post(validate(addCategoryValidation), categoryController.addCategory)
  .get(categoryController.getAllCategories);
router
  .route("/:id")
  .put(validate(updateCategoryValidation), categoryController.updateCategory)
  .delete(
    validate(deleteCategoryValidation),
    categoryController.deleteCategory
  );

export default router;
