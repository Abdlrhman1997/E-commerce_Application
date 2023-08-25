import { Router } from "express";
const router = Router();
import * as productController from "./product.controller.js";

router
  .route("/")
  .post(productController.addproduct)
  .get(productController.getAllProducts);
router
  .route("/:id")
  .put(productController.updateproduct)
  .delete(productController.deleteproduct);

export default router;
