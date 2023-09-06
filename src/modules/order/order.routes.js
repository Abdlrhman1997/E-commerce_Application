import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .get(protectedRoutes, allowedTo("user"), orderController.getUserOrder);

router.get("/orders", orderController.getAllOrders);

router
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    orderController.createCashOrder
  );

export default router;
