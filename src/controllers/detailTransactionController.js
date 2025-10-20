import DetailTransactionService from "../services/detailTransactionService.js";

const DetailTransactionController = {
  getDetailTransactionByTransactionId: async (req, res, next) => {
    try {
      const { transaction_id } = req.params;

      const detailTransactions =
        await DetailTransactionService.getDetailTransactionByTransactionId(
          transaction_id
        );

      res.status(200).json({
        message: `Detail Transaction fetched successfully`,
        data: detailTransactions,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getDetailTransaction: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const detailTransactions =
        await DetailTransactionService.getDetailTransaction(user_id);
      res.status(200).json({
        message: `Detail Transaction fetched successfully`,
        data: detailTransactions,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  createDetailTransaction: async (req, res, next) => {
    try {
      const {
        transaction_id,
        product_id,
        cost_price_at_sale,
        selling_price_at_sale,
        quantity,
      } = req.body;

      const newDetailTransaction =
        await DetailTransactionService.createDetailTransaction(
          transaction_id,
          product_id,
          cost_price_at_sale,
          selling_price_at_sale,
          quantity
        );

      res.status(201).json({
        message: `Detail transaction created successfully`,
        data: newDetailTransaction,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default DetailTransactionController;
