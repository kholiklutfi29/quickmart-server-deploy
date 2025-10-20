import MidtransService from "../services/paymentService.js";

const PaymentController = {
  createSnapTransaction: async (req, res) => {
    try {
      const transactionData = req.body;
      const snapToken = await MidtransService.createSnapToken(transactionData);

      return res.status(200).json({ token: snapToken });
    } catch (error) {
      return res.status(500).json({
        message: "Gagal membuat Snap Token",
        error: error.message,
      });
    }
  },
};

export default PaymentController;