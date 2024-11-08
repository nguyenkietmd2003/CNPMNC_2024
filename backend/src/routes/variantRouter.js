import express from "express";
import {
  getAllRom,
  createRom,
  updateRom,
  deleteRom,
  getAllColor,
  createAllColor,
  updateColor,
  deleteColor,
  getProductReview,
  createProductReview,
  updateProductReview,
  deleteProductReview,
} from "../controllers/VariantController.js";

const variantRouter = express.Router();

//
variantRouter.get("/get-all-rom", getAllRom);
variantRouter.post("/create-rom", createRom);
variantRouter.post("/update-rom/:id", updateRom);
variantRouter.post("/delete-rom/:id", deleteRom);

//

variantRouter.get("/get-all-Color", getAllColor);
variantRouter.post("/create-all-Color", createAllColor);
variantRouter.post("/delete-all-Color/:id", deleteColor);
variantRouter.post("/update-all-Color/:id", updateColor);

//

variantRouter.get("/get-product-review", getProductReview);
variantRouter.post("/create-product-review", createProductReview);
variantRouter.post("/update-product-review/:id", updateProductReview);
variantRouter.post("/delete-product-review/:id", deleteProductReview);

//

//

export default variantRouter;
