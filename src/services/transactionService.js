import TransactionModel from "../models/transactionModel.js";

const TransactionService = {
  createTransaction: async (userId, paymentMethod) => {
    return await TransactionModel.createTransaction(userId, paymentMethod);
  },

  getTransactionByUserId: async (userId) => {
    return await TransactionModel.getTransactionByUserId(userId);
  },
};

export default TransactionService;
