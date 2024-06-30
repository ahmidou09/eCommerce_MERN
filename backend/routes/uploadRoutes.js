import express from "express";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

// Mongo URI
const mongoURI = process.env.MONGO_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
let gridFSBucket;

conn.once("open", () => {
  console.log("MongoDB connection opened for GridFS");
  gridFSBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = gridFSBucket;
});

// Create storage engine
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Single file upload route
router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const filename = `${req.file.fieldname}-${Date.now()}${path.extname(
    req.file.originalname
  )}`;
  const stream = gridFSBucket.openUploadStream(filename, {
    contentType: req.file.mimetype,
  });

  stream.end(req.file.buffer, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send({ message: "Error uploading file" });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: filename,
    });
  });
});

// Multiple files upload route
router.post("/multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: "No files uploaded" });
  }

  const uploadedFiles = [];

  req.files.forEach((file) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    const stream = gridFSBucket.openUploadStream(filename, {
      contentType: file.mimetype,
    });

    stream.end(file.buffer, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send({ message: "Error uploading file" });
      }

      uploadedFiles.push(filename);
    });
  });

  res.status(200).send({
    message: "Images uploaded successfully",
    images: uploadedFiles,
  });
});

export default router;
