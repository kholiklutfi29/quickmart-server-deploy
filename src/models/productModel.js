import pool from "../config/db.js";

const ProductModel = {
  getProductByUserId: async (userId) => {
    const query = "SELECT * FROM products WHERE user_id = $1;";
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  getProductActiveWithBarcode: async (barcodeNumber) => {
    const query = `
      SELECT *
      FROM products
      WHERE barcode_number = $1
        AND is_active = TRUE;
    `;

    const { rows } = await pool.query(query, [barcodeNumber]);
    return rows[0];
  },

  getActiveProduct: async (userId) => {
    const query = `
        SELECT * FROM products 
        WHERE user_id = $1 AND is_active = true;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  findProductById: async (productId) => {
    const query = "SELECT * FROM products WHERE product_id = $1;";
    const { rows } = await pool.query(query, [productId]);
    return rows[0];
  },

  createProduct: async (
    userId,
    barcodeNumber,
    productName,
    costPrice,
    sellingPrice,
    currentStock
  ) => {
    const query = `
            INSERT INTO products (user_id, barcode_number, product_name, cost_price, selling_price, current_stock)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

    const { rows } = await pool.query(query, [
      userId,
      barcodeNumber,
      productName,
      costPrice,
      sellingPrice,
      currentStock,
    ]);

    return rows[0];
  },

  findByBarcode: async (barcodeNumber) => {
    const query = "SELECT * FROM products WHERE barcode_number = $1";
    const { rows } = await pool.query(query, [barcodeNumber]);
    return rows[0];
  },

  updateProductStock: async (newAmount, productId) => {
    const query = `
            UPDATE products
            SET current_stock = $1, updated_at = NOW()
            WHERE product_id = $2
            RETURNING current_stock;
        `;
    const { rows } = await pool.query(query, [newAmount, productId]);
    return rows[0];
  },

  updateAllPrice: async (newCostPrice, newSellingPrice, productId) => {
    const query = `
            UPDATE products
            SET cost_price = $1, selling_price = $2
            WHERE product_id = $3
            RETURNING *;
        `;
    const { rows } = await pool.query(query, [
      newCostPrice,
      newSellingPrice,
      productId,
    ]);
    return rows[0];
  },

  updateCostPrice: async (newCostPrice, productId) => {
    const query = `
            UPDATE products
            SET cost_price = $1
            WHERE product_id = $2
            RETURNING *;
        `;
    const { rows } = await pool.query(query, [newCostPrice, productId]);
    return rows[0];
  },

  updateSellingPrice: async (newSellingPrice, productId) => {
    const query = `
            UPDATE products
            SET selling_price = $1
            WHERE product_id = $2
            RETURNING *;
        `;
    const { rows } = await pool.query(query, [newSellingPrice, productId]);
    return rows[0];
  },

  changeProductStatus: async (newStatus, productId) => {
    const query = `
            UPDATE products
            SET is_active = $1
            WHERE product_id = $2
            RETURNING *;
        `;
    const { rows } = await pool.query(query, [newStatus, productId]);
    return rows[0];
  },

  increaseStockProduct: async (productId, amount) => {
    const query = `
        UPDATE products
        SET current_stock = current_stock + $2, updated_at = NOW()
        WHERE product_id = $1
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [productId, amount]);
    return rows[0];
  },

  decreaseStockProduct: async (productId, amount) => {
    const query = `
        UPDATE products
        SET current_stock = current_stock - $2
        WHERE product_id = $1
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [productId, amount]);
    return rows[0];
  }
};

export default ProductModel;
