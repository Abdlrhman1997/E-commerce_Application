import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), cartController.addProductToCart)
  .get(protectedRoutes, allowedTo("user"), cartController.getLogedUserCart);

router.post(
  "/applyCoupon",
  protectedRoutes,
  allowedTo("user"),
  cartController.applyCoupon
);

// .get(cartController.getAllcarts);
router
  .route("/:id")
  .patch(
    protectedRoutes,
    allowedTo("admin", "user"),
    cartController.removeProductFromCart
  )
  .put(
    protectedRoutes,
    allowedTo("user"),
    cartController.updateCartProductQuantity
  );

export default router;
