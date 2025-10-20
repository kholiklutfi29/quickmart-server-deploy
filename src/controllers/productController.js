import ProductService from "../services/productService.js";

const ProductController = {
  createProduct: async (req, res, next) => {
    try {
      const {
        user_id,
        barcode_number,
        product_name,
        cost_price,
        selling_price,
        current_stock,
      } = req.body;

      const newProduct = await ProductService.createProduct(
        user_id,
        barcode_number,
        product_name,
        cost_price,
        selling_price,
        current_stock
      );

      res.status(201).json({
        message: `Product ${newProduct.product_name} successfully registered`,
        data: newProduct
      });

      console.log(`Product ${product_name} successfully registered`)
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  findProductById: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const product = await ProductService.findProductById(product_id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getProductByUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const products = await ProductService.getProductsByUserId(user_id);

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getProductWithBarcode: async (req, res, next) => {
    try {
      const { barcode_number } = req.params;
      const products = await ProductService.getProductWithBarcode(barcode_number);

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getActiveProduct: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const products = await ProductService.getActiveProduct(user_id);

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  changeProductStatus: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { is_active } = req.body;
      const product = await ProductService.changeProductStatus(
        is_active,
        product_id
      );

      res.status(200).json({
        message: `Product status changed to ${product.is_active}`,
        data: product,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  updateAllPrice: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { cost_price, selling_price } = req.body;

      const newPrice = await ProductService.updateAllPrice(
        cost_price,
        selling_price,
        product_id
      );

      res.status(200).json({
        message: `Price ${newPrice.product_name} has been updated`,
        data: newPrice,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  updateCostPrice: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { cost_price } = req.body;

      const newPrice = await ProductService.updateCostPrice(
        cost_price,
        product_id
      );

      res.status(200).json({
        message: `Cost price of product ${newPrice.product_name} has been updated`,
        data: newPrice,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  updateSellingPrice: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { selling_price } = req.body;

      const newPrice = await ProductService.updateSellingPrice(
        selling_price,
        product_id
      );

      res.status(200).json({
        message: `Selling price of product ${newPrice.product_name} has been updated`,
        data: newPrice,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  scanProduct: async (req, res, next) => {
    try {
      const { barcode_number } = req.params;
      const { quantity } = req.body;

      const result = await ProductService.scanProduct(barcode_number, quantity);

      res.status(200).json({
        message: "Scan product successfully",
        data: result,
      });
      console.log("Scan successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default ProductController;