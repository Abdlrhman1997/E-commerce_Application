import { Router } from "express";
const router = Router();
import * as wishlistController from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), wishlistController.addToWishlist)
  .delete(
    protectedRoutes,
    allowedTo("user"),
    wishlistController.deleteFromWishlist
  )
  .get(protectedRoutes, allowedTo("user"), wishlistController.getUserWishlist);

export default router;
