const pool = require("../db/db");
const logger = require("../utils/logger");

const createProduct = async (data, userId) => {
  const {article_no,item_name,in_price,out_price,unit,in_stock,description} = data;
  try {
    const {rows} = await pool.query(
      `INSERT INTO products (article_no, item_name, in_price, out_price, unit, in_stock, description, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [article_no, item_name, in_price, out_price, unit, in_stock, description, userId]
    );
    logger.info(`Product created: ${item_name} by user ID ${userId}..`);
    return rows[0];
  } catch (error) {
    logger.error(`Error creating product: ${error.message}..`);
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const {rows} = await pool.query(
      `SELECT p.*, u.username AS created_by_user
       FROM products p
       LEFT JOIN users u ON p.created_by = u.id
       ORDER BY p.id DESC`
    );
    return rows;
  } catch (error) {
    logger.error(`Error fetching products: ${error.message}..`);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const {rows} = await pool.query(
      `SELECT p.*, u.username AS created_by_user
       FROM products p
       LEFT JOIN users u ON p.created_by = u.id
       WHERE p.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      const err = new Error("Product not found..");
      err.status = 404;
      throw err;
    }
    return rows[0];
  } catch (error) {
    logger.error(`Error fetching product ID ${id}: ${error.message}..`);
    throw error;
  }
};

const updateProduct = async (id, data) => {
  const {item_name,in_price,out_price,unit,in_stock,description} = data;
  try {
    const {rows} = await pool.query(
      `UPDATE products
       SET item_name = $1,
           in_price = $2,
           out_price = $3,
           unit = $4,
           in_stock = $5,
           description = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [item_name, in_price, out_price, unit, in_stock, description, id]
    );
    if (rows.length === 0) {
      const err = new Error("Product not found or not updated..");
      err.status = 404;
      throw err;
    }
    logger.info(`Product ID ${id} updated..`);
    return rows[0];
  } catch (error) {
    logger.error(`Error updating product ID ${id}: ${error.message}..`);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const {rowCount} = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    if (rowCount === 0) {
      const err = new Error("Product not found or already deleted..");
      err.status = 404;
      throw err;
    }
    logger.info(`Product ID ${id} deleted..`);
    return {message: "Product deleted successfully.."};
  } catch (error) {
    logger.error(`Error deleting product ID ${id}: ${error.message}..`);
    throw error;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
