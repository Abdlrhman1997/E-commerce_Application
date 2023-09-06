import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

// router
//   .route("/")
//   .post(protectedRoutes, allowedTo("user"), orderController.addProductToorder)
//   .get(protectedRoutes, allowedTo("user"), orderController.getLogedUserorder);

// .get(orderController.getAllorders);

router
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    orderController.createCashOrder
  );

export default router;
