import { Router } from "express";
const router = Router();
import * as addressController from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), addressController.addToAddress)
  .delete(
    protectedRoutes,
    allowedTo("user"),
    addressController.deleteFromAddress
  )
  .get(protectedRoutes, allowedTo("user"), addressController.getUserAddress);

export default router;
