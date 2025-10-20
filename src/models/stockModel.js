import pool from "../config/db.js";

const StockModel = {

  getByProductId: async (productId) => {
    const query = "SELECT * FROM stock_histories WHERE productId = $1;";
    const { rows } = await pool.query(query, [productId]);
    return rows[0];
  },

  updateStock: async (productId, newAmount) => {
    const query = `
      UPDATE stock_histories
      SET amount = $1, updatedAt = NOW()
      WHERE product_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [newAmount, productId]);
    return rows[0];
  },

  createStockHistories: async (productId, amount, stockType) => {
    const query = `
      INSERT INTO stock_histories (product_id, amount, type) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [productId, amount, stockType]);
    return rows[0];
  }
};

export default StockModel;
