const pool = require("../db/db");
const logger = require("../utils/logger");

// Fetch all components for a specific page and language
const getPageContent = async (pageName, language) => {
  try {
    const { rows } = await pool.query(
      `SELECT section, component_key, content, display_order 
       FROM page_content 
       WHERE LOWER(page_name) = LOWER($1) AND LOWER(language) = LOWER($2)
       ORDER BY display_order`,
      [pageName, language]
    );

    if (rows.length === 0) {
      const error = new Error(`No content found for page '${pageName}' in '${language}'.`);
      error.status = 404;
      throw error;
    }

    logger.info(`Fetched content for page '${pageName}' (${language})`);
    // Returns a flat array of components. The controller will structure this.
    return rows;
  } catch (error) {
    logger.error(`Error fetching content for '${pageName}': ${error.message}`);
    throw error;
  }
};

// Fetch all page content (useful for admin or debugging)
const getAllPageContent = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT id, page_name, section, component_key, language, content, display_order, last_updated 
       FROM page_content ORDER BY page_name, language, section, display_order`
    );
    logger.info("Fetched all page content.");
    return rows;
  } catch (error) {
    logger.error(`Error fetching all page content: ${error.message}`);
    throw error;
  }
};

// Create new page content
const createPageContent = async (data) => {
  const { page_name, section, component_key, language, content, display_order } = data;

  try {
    const { rows } = await pool.query(
      `INSERT INTO page_content (page_name, section, component_key, language, content, display_order)
       VALUES ($1, $2, $3, LOWER($4), $5, $6)
       RETURNING *`,
      [page_name, section, component_key, language, content, display_order]
    );

    logger.info(`Added new page content: '${page_name}' > '${section}' > '${component_key}' (${language})`);
    return rows[0];
  } catch (error) {
    logger.error(`Error creating page content: ${error.message}`);
    throw error;
  }
};

// Update existing page content by its ID
const updatePageContent = async (id, data) => {
  const { content, display_order } = data;

  try {
    const { rows } = await pool.query(
      `UPDATE page_content
       SET content = $1,
           display_order = $2,
           last_updated = NOW()
       WHERE id = $3
       RETURNING *`,
      [content, display_order, id]
    );

    if (rows.length === 0) {
      const error = new Error("Page content not found or not updated.");
      error.status = 404;
      throw error;
    }

    logger.info(`Updated page content ID ${id}`);
    return rows[0];
  } catch (error) {
    logger.error(`Error updating page content ID ${id}: ${error.message}`);
    throw error;
  }
};

// Delete page content by its ID
const deletePageContent = async (id) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM page_content WHERE id = $1", [id]);
    if (rowCount === 0) {
      const error = new Error("Page content not found or already deleted.");
      error.status = 404;
      throw error;
    }

    logger.info(`Deleted page content ID ${id}`);
    return { message: "Page content deleted successfully." };
  } catch (error) {
    logger.error(`Error deleting page content ID ${id}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getPageContent,
  getAllPageContent,
  createPageContent,
  updatePageContent,
  deletePageContent,
};
