import { Router } from "express";
const router = Router();
import * as couponController from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), couponController.addcoupon)
  .get(couponController.getAllcoupons);
router
  .route("/:id")
  .get(couponController.getCoupon)
  .put(protectedRoutes, allowedTo("user"), couponController.updatecoupon)
  .delete(
    protectedRoutes,
    allowedTo("admin", "user"),
    couponController.deletecoupon
  );

export default router;
