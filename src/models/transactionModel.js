import pool from "../config/db.js";

const TransactionModel = {
  getTransactionByUserId: async (userId) => {
    const query = `
      SELECT 
        t.transaction_id,
        t.user_id,
        t.payment_method,
        t.created_at,
        t.updated_at,
        dt.detail_transactions_id,
        dt.product_id,
        dt.quantity,
        dt.cost_price_at_sale,
        dt.selling_price_at_sale,
        dt.created_at,
        dt.updated_at,
        p.product_name,
        p.barcode_number,
        p.current_stock,
        (dt.quantity * dt.selling_price_at_sale) AS subtotal
      FROM transactions t
      JOIN detail_transactions dt ON t.transaction_id = dt.transaction_id
      JOIN products p ON dt.product_id = p.product_id
      WHERE t.user_id = $1
      ORDER BY t.created_at DESC;
    `;

    const { rows } = await pool.query(query, [userId]);

    // Group transaksi -> details
    const transactionsMap = {};
    rows.forEach((row) => {
      if (!transactionsMap[row.transaction_id]) {
        transactionsMap[row.transaction_id] = {
          transaction_id: row.transaction_id,
          user_id: row.user_id,
          payment_method: row.payment_method,
          created_at: row.created_at,
          updated_at: row.updated_at,
          detail_transaction: [], // ikutin format Sequelize
          total: 0,
        };
      }

      transactionsMap[row.transaction_id].detail_transaction.push({
        detail_transactions_id: row.detail_transactions_id,
        product_id: row.product_id,
        product_name: row.product_name,
        barcode_number: row.barcode_number,
        quantity: row.quantity,
        cost_price_at_sale: row.cost_price_at_sale,
        selling_price_at_sale: row.selling_price_at_sale,
        current_stock: row.current_stock,
        subtotal: row.subtotal,
        created_at: row.created_at,   // detail created_at
        updated_at: row.updated_at,
      });

      transactionsMap[row.transaction_id].total += row.subtotal;
    });

    return Object.values(transactionsMap);
  },

  createTransaction: async (userId, paymentMethod) => {
    const query = `
      INSERT INTO transactions (user_id, payment_method)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      userId,
      paymentMethod,
    ]);
    return rows[0];
  },
};

export default TransactionModel;
