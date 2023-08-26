import { Router } from "express";
const router = Router();
import * as userController from "./user.controller.js";

router.route("/").post(userController.adduser).get(userController.getAllusers);
router
  .route("/:id")
  .put(userController.updateuser)
  .patch(userController.changeUserPassword)
  .delete(userController.deleteuser);

export default router;
