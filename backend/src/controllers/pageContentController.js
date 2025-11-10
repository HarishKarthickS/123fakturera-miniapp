const pageContentService = require("../services/pageContentService");

// Get specific page content by name and language
const getPageContent = async (req, res, next) => {
  try {
    const { pageName, language } = req.params;
    const components = await pageContentService.getPageContent(pageName, language);

    // Transform the flat array of components into a nested object
    const structuredContent = components.reduce((acc, item) => {
      // If the section doesn't exist, create it
      if (!acc[item.section]) {
        acc[item.section] = {};
      }
      // Add the component key and content to the section
      acc[item.section][item.component_key] = item.content;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Page content fetched successfully.",
      content: structuredContent,
    });
  } catch (error) {
    next(error);
  }
};

// Get all page content (admin only)
const getAllPageContent = async (req, res, next) => {
  try {
    const allContent = await pageContentService.getAllPageContent();
    res.status(200).json({
      success: true,
      message: "All page content retrieved successfully.",
      count: allContent.length,
      data: allContent,
    });
  } catch (error) {
    next(error);
  }
};

// Create new page content
const createPageContent = async (req, res, next) => {
  try {
    // The request body should now include: page_name, section, component_key, language, content, display_order
    const newContent = await pageContentService.createPageContent(req.body);
    res.status(201).json({
      success: true,
      message: "Page content added successfully.",
      content: newContent,
    });
  } catch (error) {
    next(error);
  }
};

// Update page content
const updatePageContent = async (req, res, next) => {
  try {
    // The request body for update should include: content, display_order
    const updated = await pageContentService.updatePageContent(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Page content updated successfully.",
      content: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Delete page content
const deletePageContent = async (req, res, next) => {
  try {
    const result = await pageContentService.deletePageContent(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPageContent,
  getAllPageContent,
  createPageContent,
  updatePageContent,
  deletePageContent,
};
