const productService = require("../services/productService");
const pool = require("../db/db");

jest.mock("../db/db", () => ({
  query: jest.fn(),
}));

jest.mock("../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for createProduct
  describe("createProduct", () => {
    it("should create a new product and return it", async () => {
      const productData = {
        article_no: "123",
        item_name: "Test Item",
        in_price: 10,
        out_price: 20,
        unit: "pcs",
        in_stock: 100,
        description: "A test item",
      };
      const userId = 1;
      const expectedProduct = { id: 1, ...productData, created_by: userId };

      pool.query.mockResolvedValue({ rows: [expectedProduct] });

      const result = await productService.createProduct(productData, userId);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedProduct);
    });

    it("should throw an error if the database query fails", async () => {
      const productData = {};
      const userId = 1;
      const errorMessage = "Database error";

      pool.query.mockRejectedValue(new Error(errorMessage));

      await expect(
        productService.createProduct(productData, userId)
      ).rejects.toThrow(errorMessage);
    });
  });

  // Test for getAllProducts
  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = [
        { id: 1, item_name: "Item 1" },
        { id: 2, item_name: "Item 2" },
      ];
      pool.query.mockResolvedValue({ rows: products });

      const result = await productService.getAllProducts();

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(products);
    });

    it("should throw an error if the database query fails", async () => {
      const errorMessage = "Database error";
      pool.query.mockRejectedValue(new Error(errorMessage));

      await expect(productService.getAllProducts()).rejects.toThrow(
        errorMessage
      );
    });
  });

  // Test for getProductById
  describe("getProductById", () => {
    it("should return a product by its ID", async () => {
      const product = { id: 1, item_name: "Test Item" };
      pool.query.mockResolvedValue({ rows: [product] });

      const result = await productService.getProductById(1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
      expect(result).toEqual(product);
    });

    it("should throw a 404 error if the product is not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(productService.getProductById(999)).rejects.toThrow(
        "Product not found."
      );
    });

    it("should throw an error if the database query fails", async () => {
      const errorMessage = "Database error";
      pool.query.mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProductById(1)).rejects.toThrow(
        errorMessage
      );
    });
  });

  // Test for updateProduct
  describe("updateProduct", () => {
    it("should update a product and return the updated data", async () => {
      const productData = {
        item_name: "Updated Item",
        in_price: 15,
        out_price: 25,
        unit: "pcs",
        in_stock: 150,
        description: "An updated test item",
      };
      const updatedProduct = { id: 1, ...productData };

      pool.query.mockResolvedValue({ rows: [updatedProduct] });

      const result = await productService.updateProduct(1, productData);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedProduct);
    });

    it("should throw a 404 error if the product to update is not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(productService.updateProduct(999, {})).rejects.toThrow(
        "Product not found or not updated."
      );
    });

    it("should throw an error if the database query fails", async () => {
      const errorMessage = "Database error";
      pool.query.mockRejectedValue(new Error(errorMessage));

      await expect(productService.updateProduct(1, {})).rejects.toThrow(
        errorMessage
      );
    });
  });

  // Test for deleteProduct
  describe("deleteProduct", () => {
    it("should delete a product and return a success message", async () => {
      pool.query.mockResolvedValue({ rowCount: 1 });

      const result = await productService.deleteProduct(1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
      expect(result).toEqual({ message: "Product deleted successfully." });
    });

    it("should throw a 404 error if the product to delete is not found", async () => {
      pool.query.mockResolvedValue({ rowCount: 0 });

      await expect(productService.deleteProduct(999)).rejects.toThrow(
        "Product not found or already deleted."
      );
    });

    it("should throw an error if the database query fails", async () => {
      const errorMessage = "Database error";
      pool.query.mockRejectedValue(new Error(errorMessage));

      await expect(productService.deleteProduct(1)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
