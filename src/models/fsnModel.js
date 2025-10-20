import pool from "../config/db.js";

const FsnModel = {
  getFsnByUserId: async (userId) => {
    const query = `
      WITH stock_data AS (
        SELECT 
          p.product_id,
          p.product_name,
          p.current_stock,
          COALESCE(SUM(CASE WHEN sh.type = 'IN' AND sh.created_at >= NOW() - INTERVAL '1 month' THEN sh.amount END), 0) AS total_in,
          COALESCE(SUM(CASE WHEN sh.type = 'OUT' AND sh.created_at >= NOW() - INTERVAL '1 month' THEN sh.amount END), 0) AS total_out
        FROM products p
        LEFT JOIN stock_histories sh ON p.product_id = sh.product_id
        WHERE p.user_id = $1
        GROUP BY p.product_id, p.product_name, p.current_stock
      ),
      stock_calc AS (
        SELECT 
          product_id,
          product_name,
          total_in,
          total_out,
          current_stock,
          (current_stock + total_out - total_in) AS opening_stock,
          current_stock AS closing_stock
        FROM stock_data
      ),
      tor_calc AS (
        SELECT
          product_id,
          product_name,
          total_in,
          total_out,
          opening_stock,
          closing_stock,
          ROUND(((opening_stock + closing_stock) / 2.0), 2) AS avg_stock,
          ROUND(
            total_out::numeric / NULLIF(((opening_stock + closing_stock) / 2.0), 0),
          2) AS tor
        FROM stock_calc
      ),
      quartiles AS (
        SELECT 
          percentile_cont(0.25) WITHIN GROUP (ORDER BY tor) AS q1,
          percentile_cont(0.75) WITHIN GROUP (ORDER BY tor) AS q3
        FROM tor_calc
      )
      SELECT 
        t.product_id,
        t.product_name,
        t.total_in,
        t.total_out,
        t.opening_stock,
        t.closing_stock,
        t.avg_stock,
        t.tor,
        CASE
          WHEN t.tor >= q.q3 THEN 'FAST'
          WHEN t.tor >= q.q1 THEN 'SLOW'
          ELSE 'NON-MOVING'
        END AS fsn_class
      FROM tor_calc t
      CROSS JOIN quartiles q
      ORDER BY t.tor DESC NULLS LAST;
    `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
};

export default FsnModel;
