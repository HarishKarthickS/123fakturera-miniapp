const productController = require("../controllers/productController");
const productService = require("../services/productService");

jest.mock("../services/productService");
jest.mock("../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

const mockRequest = (body = {}, user = null, params = {}) => ({
  body,
  user,
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("Product Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const req = mockRequest({ item_name: "Test Product" }, { id: 1 });
      const res = mockResponse();
      const newProduct = { id: 1, item_name: "Test Product" };
      productService.createProduct.mockResolvedValue(newProduct);

      await productController.createProduct(req, res, mockNext);

      expect(productService.createProduct).toHaveBeenCalledWith(
        req.body,
        req.user.id
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product created successfully..",
        product: newProduct,
      });
    });

    it("should call next with error if product creation fails", async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();
      const error = new Error("Creation failed");
      productService.createProduct.mockRejectedValue(error);

      await productController.createProduct(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getAllProducts", () => {
    it("should get all products successfully", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const products = [{ id: 1 }, { id: 2 }];
      productService.getAllProducts.mockResolvedValue(products);

      await productController.getAllProducts(req, res, mockNext);

      expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "All products fetched successfully..",
        count: products.length,
        products,
      });
    });

    it("should call next with error if fetching all products fails", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new Error("Fetch failed");
      productService.getAllProducts.mockRejectedValue(error);

      await productController.getAllProducts(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getProductById", () => {
    it("should get product by ID successfully", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      const product = { id: 1, item_name: "Test Product" };
      productService.getProductById.mockResolvedValue(product);

      await productController.getProductById(req, res, mockNext);

      expect(productService.getProductById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product details retrieved successfully..",
        product,
      });
    });

    it("should call next with error if fetching product by ID fails", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      const error = new Error("Product not found");
      productService.getProductById.mockRejectedValue(error);

      await productController.getProductById(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("updateProduct", () => {
    it("should update product successfully", async () => {
      const req = mockRequest({ item_name: "Updated Product" }, null, {
        id: 1,
      });
      const res = mockResponse();
      const updatedProduct = { id: 1, item_name: "Updated Product" };
      productService.updateProduct.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res, mockNext);

      expect(productService.updateProduct).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product updated successfully..",
        product: updatedProduct,
      });
    });

    it("should call next with error if product update fails", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      const error = new Error("Update failed");
      productService.updateProduct.mockRejectedValue(error);

      await productController.updateProduct(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteProduct", () => {
    it("should delete product successfully", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      const deleteResult = { message: "Product deleted successfully." };
      productService.deleteProduct.mockResolvedValue(deleteResult);

      await productController.deleteProduct(req, res, mockNext);

      expect(productService.deleteProduct).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: deleteResult.message,
      });
    });

    it("should call next with error if product deletion fails", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      const error = new Error("Deletion failed");
      productService.deleteProduct.mockRejectedValue(error);

      await productController.deleteProduct(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
