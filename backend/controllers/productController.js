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
  const product = new Product({
    name: "Sample name",
    price: 0,
    image: "/images/sample.jpg",
    user: req.user._id,
    images: [],
    colors: [],
    sizes: [],
    description: "Sample description",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    oldPrice: 0,
    discount: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    images,
    colors,
    sizes,
    description,
    brand,
    category,
    countInStock,
    oldPrice,
    discount,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;
    if (images !== undefined) product.images = images;
    if (colors !== undefined) product.colors = colors;
    if (sizes !== undefined) product.sizes = sizes;
    if (description !== undefined) product.description = description;
    if (brand !== undefined) product.brand = brand;
    if (category !== undefined) product.category = category;
    if (countInStock !== undefined) product.countInStock = countInStock;
    if (oldPrice !== undefined) product.oldPrice = oldPrice;
    if (discount !== undefined) product.discount = discount;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
