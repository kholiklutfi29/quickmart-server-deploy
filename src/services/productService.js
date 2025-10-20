import ProductModel from "../models/productModel.js";
import StockModel from "../models/stockModel.js";

const ProductService = {
  createProduct: async (
    userId,
    barcodeNumber,
    productName,
    costPrice,
    sellingPrice,
    currentStock
  ) => {
    const existingProduct = await ProductModel.findByBarcode(barcodeNumber);
    if (existingProduct) {
      throw new Error("Product has been registered");
    }

    const newProduct = await ProductModel.createProduct(
      userId,
      barcodeNumber,
      productName,
      costPrice,
      sellingPrice,
      currentStock
    );

    // Catat stock awal di stock_histories
    if (currentStock > 0) {
      await StockModel.createStockHistories(
        newProduct.product_id,
        currentStock,
        "IN"
      );
    }

    return newProduct;
  },
  
  findProductById: async (productId) => {
    return await ProductModel.findProductById(productId);
  },

  getProductWithBarcode: async (barcodeNumber) => {
    return await ProductModel.getProductActiveWithBarcode(barcodeNumber);
  },

  getProductsByUserId: async (userId) => {
    return await ProductModel.getProductByUserId(userId);
  },

  getActiveProduct: async (userId) => {
    return await ProductModel.getActiveProduct(userId);
  },

  changeProductStatus: async (newStatus, productId) => {
    const existingProduct = await ProductModel.findProductById(productId);

    if (!existingProduct) {
      throw new Error("Product not registered");
    }

    return await ProductModel.changeProductStatus(newStatus, productId);
  },

  updateAllPrice: async (newCostPrice, newSellingPrice, productId) => {
    const existingProduct = await ProductModel.findProductById(productId);

    if (!existingProduct) {
      throw new Error("Product not registered");
    }

    return await ProductModel.updateAllPrice(
      newCostPrice,
      newSellingPrice,
      productId
    );
  },

  updateCostPrice: async (newCostPrice, productId) => {
    const existingProduct = await ProductModel.findProductById(productId);

    if (!existingProduct) {
      throw new Error("Product not registered");
    }

    return await ProductModel.updateCostPrice(newCostPrice, productId);
  },

  updateSellingPrice: async (newSellingPrice, productId) => {
    const existingProduct = await ProductModel.findProductById(productId);

    if (!existingProduct) {
      throw new Error("Product not registered");
    }

    return await ProductModel.updateSellingPrice(newSellingPrice, productId);
  },

  scanProduct: async (barcodeNumber, quantity) => {
    // search for product
    const product = await ProductModel.findByBarcode(barcodeNumber);
    console.log("Scan product:", product);
    if (!product) {
      throw new Error("Product not found");
    }

    // validate stock
    if (product.current_stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // create stock histories
    const newStockHistory = await StockModel.createStockHistories(
      product.product_id,
      quantity,
      "OUT"
    );

    // update product stock
    const updatedProductStock = await ProductModel.decreaseStockProduct(
      product.product_id,
      quantity
    );
    console.log("Updated stock:", updatedProductStock);

    return {
      product_name: product.product_name,
      current_stock: updatedProductStock.current_stock,
      type: newStockHistory.type,
    };
  },
};

export default ProductService;
