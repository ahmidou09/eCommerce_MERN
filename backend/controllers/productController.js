import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @ desc    get all products or products by category
// @ route   GET /api/products
// @ access  public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGE_SIZE) || 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {};

  const filter = { ...keyword, ...category };

  const count = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @ desc    create product
// @ route   POST /api/products
// @ access  private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: Number(0),
    image: "/images/sample.jpg",
    user: req.user._id,
    images: [],
    colors: [],
    sizes: [],
    description: "Sample description",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: Number(0),
    oldPrice: Number(0),
    discount: Number(0),
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

  console.log(req.body);
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

// @desc    Create or update review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const existingReviewIndex = product.reviews.findIndex(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReviewIndex !== -1) {
      // Update existing review
      product.reviews[existingReviewIndex].rating = Number(rating);
      product.reviews[existingReviewIndex].comment = comment;
    } else {
      // Add new review
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
    }

    // Recalculate the overall rating
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added or updated" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get My Reviews
// @route   GET /api/products/myreviews
// @access  Private
const getMyReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find products that have reviews from the logged-in user
  const products = await Product.find({ "reviews.user": userId });

  // Extract only the reviews made by the user
  const userReviews = products
    .map((product) => {
      return {
        productId: product._id,
        productName: product.name,
        reviews: product.reviews.filter(
          (review) => review.user.toString() === userId.toString()
        ),
      };
    })
    .filter((product) => product.reviews.length > 0);

  res.json(userReviews);
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(6);

  res.json(topProducts);
});

// @desc    Get best selling products
// @route   GET /api/products/bestselling
// @access  Public
const getBestSellingProducts = asyncHandler(async (req, res) => {
  const bestSellingProducts = await Product.find({})
    .sort({ salesCount: -1 })
    .limit(4);

  res.json(bestSellingProducts);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getMyReviews,
  getTopProducts,
  getBestSellingProducts,
};
