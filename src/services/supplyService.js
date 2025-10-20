import SupplyModel from "../models/supplyModel.js";
import StockModel from "../models/stockModel.js";
import ProductModel from "../models/productModel.js";

const SupplyService = {
  createSupply: async (userId, productId, amount, price) => {
    // search product
    const product = await ProductModel.findProductById(productId);

    // check product 
    if (!product) {
      throw new Error("Product not found");
    }

    // update product stock
    const updateProductStock = await ProductModel.increaseStockProduct(productId, amount);

    // create stock history
    const newStockHistory = await StockModel.createStockHistories(
      productId,
      amount,
      "IN"
    );

    // create supply
    const newSupply = await SupplyModel.createSupply(userId, productId, amount, price);

    return {
        product_name: updateProductStock.product_name,
        type: newStockHistory.type,
        amount: amount,
        price: price,
        new_supply: newSupply
    }
  },

  getSupplyByUser: async (userId) => {
    return await SupplyModel.getSupplyByUser(userId);
  },

  getTotalSupplyPriceByUser: async (userId) => {
    return await SupplyModel.getTotalSupplyPriceByUser(userId);
  }
};

export default SupplyService;