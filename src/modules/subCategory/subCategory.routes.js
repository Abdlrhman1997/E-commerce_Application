import { Router } from "express";
const subCategoryRouter = Router();
import * as subCategoryController from "./subCategory.controller.js";

subCategoryRouter
  .route("/")
  .post(subCategoryController.addSubCategory)
  .get(subCategoryController.getAllSubCategories);
subCategoryRouter
  .route("/:id")
  .put(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);

export default subCategoryRouter;
