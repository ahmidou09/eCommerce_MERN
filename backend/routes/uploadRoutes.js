import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI);

let gfs;
let gridFSBucket;

conn.once("open", () => {
  console.log("MongoDB connection opened for GridFS");
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = gridFSBucket;
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    res
      .status(200)
      .send({ message: "Image uploaded successfully", image: filename });
  });
});

router.post("/multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: "No files uploaded" });
  }

  const uploadedFiles = [];
  let filesProcessed = 0;

  req.files.forEach((file) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    const stream = gridFSBucket.openUploadStream(filename, {
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
});

router.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  console.log(`Fetching file: ${filename}`);

  try {
    const files = await gfs.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).send({ message: "No files found" });
    }

    console.log(`File found: ${filename}`);
    const readStream = gfs.openDownloadStreamByName(filename);
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
