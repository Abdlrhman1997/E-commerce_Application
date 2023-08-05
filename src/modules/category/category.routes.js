import { Router } from "express";
const router = Router();
import * as categoryController from "./category.controller.js";

router.post("/addCategory", categoryController.addCategory);

export default router;
