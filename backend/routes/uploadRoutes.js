// uploadRoutes.js
import express from "express";

const router = express.Router();

const uploadRoutes = (upload, gfs) => {
  // Upload a single image
  router.post("/single", (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Upload Error:", err);
        return res.status(400).send({ message: err.message });
      }
      res.status(200).send({
        message: "Image uploaded successfully",
        file: req.file,
      });
    });
  });

  // Upload multiple images
  router.post("/multiple", (req, res) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        console.error("Upload Error:", err);
        return res.status(400).send({ message: err.message });
      }
      res.status(200).send({
        message: "Images uploaded successfully",
        files: req.files,
      });
    });
  });

  // Retrieve an image
  router.get("/:filename", async (req, res) => {
    try {
      const file = await gfs.find({ filename: req.params.filename }).toArray();
      if (!file || file.length === 0) {
        return res.status(404).send({ message: "File not found" });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  return router;
};

export default uploadRoutes;
