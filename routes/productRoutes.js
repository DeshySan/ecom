import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deletController,
  getProductController,
  productCountController,
  productFilterController,
  productListController,
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
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/get-product", getProductController);
router.get("/get-product/:slug", singleProductController);
router.get("/get-product-photo/:pid", productPhotoController);
router.delete("/product/:pid", deletController);

//filter products
router.post("/product-filters", productFilterController);
//product-count
router.get("/product-count", productCountController);
//product per page
router.get("/product-list/:page", productListController);
export default router;
