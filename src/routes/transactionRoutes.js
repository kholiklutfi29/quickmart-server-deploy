import { Router } from "express";
import TransactionController from "../controllers/transactionController.js"

const router = Router();

router.post("/", TransactionController.createTransaction); // done checking
router.get("/:user_id", TransactionController.getTransactionByUserId); //

export default router;