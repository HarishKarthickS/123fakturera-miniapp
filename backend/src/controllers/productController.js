const productService = require("../services/productService");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Product created successfully..",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      message: "All products fetched successfully..",
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product details retrieved successfully..",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully..",
      product: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
