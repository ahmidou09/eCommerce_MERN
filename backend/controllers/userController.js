import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Product from "../models/userModel.js";

// @desc    user login and get token
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      /* token: generateToken(user._id), */
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    user register
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("user register");
});

// @desc    user logout and clear cookie
// @route   POST /api/users/logout
// @access  private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("user logout");
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("user profile");
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc    get all users
// @route   GET /api/users
// @access  private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

// @desc    get user by id
// @route   GET /api/users/:id
// @access  private/admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc    delete user
// @route   DELETE /api/users/:id
// @access  private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
