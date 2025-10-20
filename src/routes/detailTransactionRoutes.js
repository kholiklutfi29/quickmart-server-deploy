import { Router } from "express";
import DetailTransactionController from "../controllers/detailTransactionController.js"

const router = Router();

router.get("/:transaction_id", DetailTransactionController.getDetailTransactionByTransactionId);
router.get("/:user_id", DetailTransactionController.getDetailTransaction);
router.post("/", DetailTransactionController.createDetailTransaction); // done checking

export default router;