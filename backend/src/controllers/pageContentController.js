const pageContentService = require("../services/pageContentService");

const getPageContent = async (req, res, next) => {
  try {
    const { pageName, language } = req.params;
    const components = await pageContentService.getPageContent(pageName, language);
    const structContent = components.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = {};
      }
      acc[item.section][item.component_key] = item.content;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Page content fetched successfully..",
      content: structContent,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPageContent = async (req, res, next) => {
  try {
    const allContent = await pageContentService.getAllPageContent();
    res.status(200).json({
      success: true,
      message: "All page content retrieved successfully..",
      count: allContent.length,
      data: allContent,
    });
  } catch (error) {
    next(error);
  }
};

const createPageContent = async (req, res, next) => {
  try {
    const newContent = await pageContentService.createPageContent(req.body);
    res.status(201).json({
      success: true,
      message: "Page content added successfully..",
      content: newContent,
    });
  } catch (error) {
    next(error);
  }
};

const updatePageContent = async (req, res, next) => {
  try {
    const updated = await pageContentService.updatePageContent(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Page content updated successfully..",
      content: updated,
    });
  } catch (error) {
    next(error);
  }
};

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
