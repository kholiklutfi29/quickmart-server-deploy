import DetailTransactionModel from "../models/detailTransactionModel.js";

const DetailTransactionService = {
  getDetailTransactionByTransactionId: async (transactionId) => {
    return await DetailTransactionModel.getDetailTransacionByTransactionId(
      transactionId
    );
  },

  createDetailTransaction: async (
    transactionId,
    productId,
    costPriceAtSale,
    sellingPriceAtSale,
    quantity
  ) => {
    return await DetailTransactionModel.createDetailTransaction(
      transactionId,
      productId,
      costPriceAtSale,
      sellingPriceAtSale,
      quantity
    );
  },

  getDetailTransaction: async(userId) => {
    return await DetailTransactionModel.getDetailTransaction(userId);
  }
};

export default DetailTransactionService;