import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = Router();

router.post("/", ProductController.createProduct); // done checking
router.get("/:user_id", ProductController.getProductByUserId); // done checking
router.get("/product/:product_id", ProductController.findProductById);
router.post("/scan/:barcode_number", ProductController.scanProduct); // done checking
router.patch("/:product_id/prices", ProductController.updateAllPrice); // done checking
router.patch("/:product_id/cost-price", ProductController.updateCostPrice); // done checking
router.patch("/:product_id/selling-price", ProductController.updateSellingPrice); // done checking
router.patch("/:product_id/status", ProductController.changeProductStatus); // done checking
router.get("/active-product/:user_id", ProductController.getActiveProduct);
router.get("/active-barcode/:barcode_number", ProductController.getProductWithBarcode);

export default router;
