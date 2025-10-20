import pool from "../config/db.js";

// Auth

const UserModel = {
    findByEmail: async (email) => {
        const query = "SELECT * FROM users WHERE email = $1";
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },

    createUser: async (username, email, hashedPassword) => {
        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING user_id, username, email
        `;
        
        const { rows } = await pool.query(query, [username, email, hashedPassword]);
        console.log("User insert result:", rows[0]);
        return rows[0];
    }
};

export default UserModel;
