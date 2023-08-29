import { Router } from "express";
const router = Router();
import * as reviewController from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), reviewController.addreview)
  .get(reviewController.getAllreviews);
router
  .route("/:id")
  .put(protectedRoutes, allowedTo("user"), reviewController.updatereview)
  .delete(
    protectedRoutes,
    allowedTo("admin", "user"),
    reviewController.deletereview
  );

export default router;
