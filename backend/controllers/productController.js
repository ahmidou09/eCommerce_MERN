import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @ desc    get all products
// @ route   GET /api/products
// @ access  public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @ desc    get single product
// @ route   GET /api/products/:id
// @ access  public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @ desc    delete product
// @ route   DELETE /api/products/:id
// @ access  private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  res.send("delete product");
});

// @ desc    create product
// @ route   POST /api/products
// @ access  private/admin

const createProduct = asyncHandler(async (req, res) => {
  res.send("create product");
});

// @ desc    update product
// @ route   PUT /api/products/:id
// @ access  private/admin

const updateProduct = asyncHandler(async (req, res) => {
  res.send("update product");
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
