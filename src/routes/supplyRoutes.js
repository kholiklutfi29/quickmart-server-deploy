import { Router } from "express";
import SupplyController from "../controllers/supplyController.js";
import validateSupply from "../middlewares/validateSupply.js";

const router = Router();

router.post("/", validateSupply, SupplyController.createSupply); // done checking
router.get("/total/:user_id", SupplyController.getTotalSupplyPriceByUser) // done checking
router.get("/:user_id", SupplyController.getSupplyByUser);

export default router;