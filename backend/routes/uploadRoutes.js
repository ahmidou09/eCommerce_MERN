import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");
const uploadMultipleImages = upload.array("images", 10);

router.post("/single", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/uploads/${req.file.filename}`,
    });
  });
});

router.post("/multiple", (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(400).send({ message: err.message });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).send({
      message: "Images uploaded successfully",
      images,
    });
  });
});

export default router;
