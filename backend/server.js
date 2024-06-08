import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// port
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// express app
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());

// cookies parser middleware
app.use(cookieParser());

// routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// error middleware
app.use(notFound);
app.use(errorHandler);

// server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
