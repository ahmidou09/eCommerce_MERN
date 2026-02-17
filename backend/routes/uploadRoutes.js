import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const router = express.Router();

let gridFSBucket;

// Helper to ensure GridFSBucket is initialized
const getGridFSBucket = () => {
  if (gridFSBucket) return gridFSBucket;

  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
    console.log("GridFSBucket initialized");
    return gridFSBucket;
  }
  throw new Error("MongoDB not connected or GridFS not initialized");
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  try {
    const bucket = getGridFSBucket();
    const filename = `${uuidv4()}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;
    const stream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    stream.end(req.file.buffer, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send({ message: "Error uploading file" });
      }
      res
        .status(200)
        .send({ message: "Image uploaded successfully", image: filename });
    });
  } catch (error) {
    console.error("GridFS Error:", error);
    res.status(500).send({ message: "Server Error: Database connection issue" });
  }
});

router.post("/multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: "No files uploaded" });
  }

  try {
    const bucket = getGridFSBucket();
    const uploadedFiles = [];
    let filesProcessed = 0;

    req.files.forEach((file) => {
      const filename = `${uuidv4()}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      const stream = bucket.openUploadStream(filename, {
        contentType: file.mimetype,
      });

      stream.end(file.buffer, (err) => {
        filesProcessed += 1;
        if (err) {
          console.error("Error uploading file:", err);
          if (filesProcessed === req.files.length) {
            return res.status(500).send({ message: "Error uploading files" });
          }
        } else {
          uploadedFiles.push(filename);
          if (filesProcessed === req.files.length) {
            res.status(200).send({
              message: "Images uploaded successfully",
              images: uploadedFiles,
            });
          }
        }
      });
    });
  } catch (error) {
    console.error("GridFS Error:", error);
    res.status(500).send({ message: "Server Error: Database connection issue" });
  }
});

router.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  console.log(`Fetching file: ${filename}`);

  try {
    const bucket = getGridFSBucket();
    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).send({ message: "No files found" });
    }

    console.log(`File found: ${filename}`);
    const readStream = bucket.openDownloadStreamByName(filename);
    readStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).send({ message: "Error streaming file" });
    });
    readStream.pipe(res).on("finish", () => {
      console.log(`Finished streaming file: ${filename}`);
    });
  } catch (err) {
    console.error("Error finding file:", err);
    res.status(500).send({ message: "Error finding file" });
  }
});

export default router;
