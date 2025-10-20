import pool from "../config/db.js";

const SupplyModel = {
    createSupply: async (userId, productId, amount, price) => {
        const query = `
            INSERT INTO supplies (user_id, product_id, amount, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [userId, productId, amount, price]);

        return rows[0];
    },

    getSupplyByUser: async (userId) => {
        const query = `
            SELECT *
            FROM supplies
            WHERE user_id = $1;
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows;
    },

    getTotalSupplyPriceByUser: async (userId) => {
        const query = `
            SELECT COALESCE(SUM(price), 0) AS total_supply_price
            FROM supplies
            WHERE user_id = $1;
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows[0].total_supply_price;
    }
}; 

export default SupplyModel;