const bcrypt = require("bcryptjs");
const db = require("../db/db");
const logger = require("../utils/logger");

const userService = {
  async registerUser(username, email, password, role = "user") {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword, role]
    );
    logger.info(`User registered: ${email}..`);
    return result.rows[0];
  },
  async findUserByEmail(email) {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },
  async findUserById(id) {
    const result = await db.query(
      "SELECT id, username, email, role, refresh_token, created_at, updated_at FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async saveRefreshToken(userId, token) {
    await db.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [token, userId]);
    logger.info(`Refresh token saved for user ID ${userId}`);
  },

  async clearRefreshToken(userId) {
    await db.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [userId]);
    logger.info(`Refresh token cleared for user ID ${userId}`);
  },

  async getUserByRefreshToken(token) {
    const result = await db.query("SELECT * FROM users WHERE refresh_token = $1", [token]);
    return result.rows[0];
  },

  async updateUser(id, username, email, password) {
    const updates = [];
    const values = [];
    let idx = 1;
    if (username) {
      updates.push(`username = $${idx++}`);
      values.push(username);
    }
    if (email) {
      updates.push(`email = $${idx++}`);
      values.push(email);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push(`password = $${idx++}`);
      values.push(hashed);
    }
    if (updates.length === 0) return null;
    values.push(id);
    const query = `
      UPDATE users SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING id, username, email, role, updated_at
    `;
    const result = await db.query(query, values);
    logger.info(`User updated: ID ${id}..`);
    return result.rows[0];
  },
  async deleteUser(id) {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    if (result.rowCount > 0) logger.info(`User deleted: ID ${id}..`);
    return result.rowCount > 0;
  },
};

module.exports = userService;
