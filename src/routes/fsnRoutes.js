import { Router } from "express";
import FsnController from "../controllers/fsnController.js";

const router = Router();

router.get("/:user_id", FsnController.getFsnByUserId);

export default router;