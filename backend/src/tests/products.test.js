const productController = require('../controllers/productController')
const productService = require('../services/productService')

jest.mock('../services/productService')
jest.mock('../utils/logger')

describe('Product Management', () => {
  let req, res, next
  
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: 1 }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('creates new product successfully', async () => {
    const productData = {
      name: 'Test Product',
      price: 99.99,
      description: 'A test product'
    }
    const createdProduct = { id: 1, ...productData }
    req.body = productData
    productService.createProduct.mockResolvedValue(createdProduct)

    await productController.createProduct(req, res, next)

    expect(productService.createProduct).toHaveBeenCalledWith(productData, req.user.id)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Product created successfully.',
      product: createdProduct
    })
  })

  test('gets all products successfully', async () => {
    const products = [
      { id: 1, name: 'Product 1', price: 99.99 },
      { id: 2, name: 'Product 2', price: 149.99 }
    ]
    productService.getAllProducts.mockResolvedValue(products)

    await productController.getAllProducts(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'All products fetched successfully.',
      count: products.length,
      products
    })
  })

  test('gets product by id successfully', async () => {
    const productId = '1'
    const product = { id: productId, name: 'Test Product', price: 99.99 }
    req.params.id = productId
    productService.getProductById.mockResolvedValue(product)

    await productController.getProductById(req, res, next)

    expect(productService.getProductById).toHaveBeenCalledWith(productId)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Product details retrieved successfully.',
      product
    })
  })

  test('updates product successfully', async () => {
    const productId = '1'
    const updates = { price: 129.99 }
    const updatedProduct = { id: productId, ...updates }
    req.params.id = productId
    req.body = updates
    productService.updateProduct.mockResolvedValue(updatedProduct)

    await productController.updateProduct(req, res, next)

    expect(productService.updateProduct).toHaveBeenCalledWith(productId, updates)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Product updated successfully.',
      product: updatedProduct
    })
  })

  test('handles errors through next middleware', async () => {
    const error = new Error('Test error')
    productService.getAllProducts.mockRejectedValue(error)

    await productController.getAllProducts(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
  })
})