import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), cartController.addProductToCart);
// .get(cartController.getAllcarts);
// router
//   .route("/:id")
//   .put(protectedRoutes, allowedTo("user"), cartController.updatecart)
//   .delete(
//     protectedRoutes,
//     allowedTo("admin", "user"),
//     cartController.deletecart
//   );

export default router;
