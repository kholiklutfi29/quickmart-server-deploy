import TransactionService from "../services/transactionService.js";

const TransactionController = {
  createTransaction: async (req, res, next) => {
    try {
      const { user_id, payment_method } = req.body;

      const newTransaction = await TransactionService.createTransaction(
        user_id,
        payment_method
      );

      res.status(201).json({
        message: "transaction created successfully",
        data: newTransaction,
      });

      console.log(
        `Transaction ${newTransaction.transaction_id} successfully created`
      );
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getTransactionByUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const transactions = await TransactionService.getTransactionByUserId(user_id);

      res.status(200).json({
        message: "Transaction fetched successfully",
        data: transactions,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default TransactionController;
