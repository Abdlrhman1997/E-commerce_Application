import { Router } from "express";
const router = Router();
import * as brandController from "./brand.controller.js";

router
  .route("/")
  .post(brandController.addbrand)
  .get(brandController.getAllCategories);
router
  .route("/:id")
  .put(brandController.updatebrand)
  .delete(brandController.deletebrand);

export default router;
