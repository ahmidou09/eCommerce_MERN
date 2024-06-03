import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// @desc    get all users and register new user
// @route   GET /api/users OR POST /api/users
// @access  private/admin
router.route("/").post(registerUser).get(protect, admin, getUsers);

// @desc    user login and get token
// @route   POST /api/users/login
// @access  Public
router.post("/login", loginUser);

// @desc    user register
// @route   POST /api/users
// @access  Public
// router.post("/register", protect, registerUser);

// @desc    user logout and clear cookie
// @route   POST /api/users/logout
// @access  private
router.post("/logout", logoutUser);

// @desc    update user profile and get user profile
// @route   PUT /api/users/profile OR GET /api/users/profile
// @access  private
router
  .route("/profile")
  .put(protect, updateUserProfile)
  .get(protect, getUserProfile);

// @desc    update user and delete user and get user by id
// @route   PUT DELETE GET /api/users/:id
// @access  private/admin
router
  .route("/:id")
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);

export default router;
