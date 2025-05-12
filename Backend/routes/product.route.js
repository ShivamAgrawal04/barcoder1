import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getPublicProducts,
  updateProductById,
} from "../controllers/product.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.get("/:id", getPublicProducts);
router.post(
  "/addProduct",
  verifyToken,
  (req, res, next) => {
    // Log the file before uploading
    console.log("Incoming file:", req.file); // This will show the file data received by Multer
    console.log(req.body);

    if (!req.file) {
      console.log("No file uploaded.");
    }

    next(); // Proceed to the next middleware or controller
  },
  upload.single("productPic"),
  addProduct
);
router.get("/getProductById/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, upload.single("productPic"), updateProductById);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
