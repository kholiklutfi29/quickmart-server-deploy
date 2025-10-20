import midtransClient from "midtrans-client";

// Inisialisasi Midtrans Snap (mode sandbox)
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-6ro66YHckePX7wWdM502FEw2", // ganti dengan server key sandbox kamu
});

const MidtransService = {
  createSnapToken: async (transactionData) => {
    const { transaction_details, customer_details } = transactionData;

    if (
      !transaction_details ||
      !transaction_details.order_id ||
      !transaction_details.gross_amount
    ) {
      throw new Error(
        "transaction_details dengan order_id dan gross_amount wajib diisi"
      );
    }

    const parameter = {
      transaction_details,
      customer_details,
    };

    try {
      const transaction = await snap.createTransaction(parameter);
      return transaction.token;
    } catch (error) {
      throw new Error(`Gagal membuat Snap Token: ${error.message}`);
    }
  },
};

export default MidtransService;