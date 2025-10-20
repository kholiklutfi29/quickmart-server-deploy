import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";

const router = Router();


router.post('/token', PaymentController.createSnapTransaction);

export default router;