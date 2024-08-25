import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deletController,
  getProductController,
  productPhotoController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.post(
  "/update-product",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/get-product", getProductController);
router.get("/get-product/:slug", singleProductController);
router.get("/get-product-photo/:pid", productPhotoController);
router.delete("/product/:pid", deletController);
export default router;
