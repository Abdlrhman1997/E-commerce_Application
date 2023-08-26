import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";

router.post("/signup", authController.signUp);

export default router;
