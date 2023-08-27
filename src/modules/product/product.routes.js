import { Router } from "express";
const router = Router();
import * as productController from "./product.controller.js";
import { uploadMixedFiles } from "../../multer/multer.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const arrayofFields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 20 },
];
router
  .route("/")
  .post(
    protectedRoutes,
    uploadMixedFiles(arrayofFields, "product"),
    productController.addproduct
  )
  .get(productController.getAllProducts);
router
  .route("/:id")
  .put(productController.updateproduct)
  .delete(productController.deleteproduct);

export default router;
