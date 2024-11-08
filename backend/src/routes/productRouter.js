import express from "express";
import {
  deleteProduct,
  createProduct,
  getProduct,
  updateProduct,
  getProductInformation,
  createProductInformation,
  updateProductInformation,
  getProductVariants,
  createProductVariants,
  updateProductVariants,
  deleteProductVariants,
  getProductByCategory,
  getProductByTag,
  getProductByID,
  getAllProduct1,
} from "../controllers/ProductController.js";

const productRouter = express.Router();
/////////////////////////////////////// chuc nang chinh/////////////////
productRouter.post("/get-product-by-category/:id", getProductByCategory);
productRouter.post("/get-product-by-tag/:id", getProductByTag);
productRouter.post("/get-product-by-id/:id", getProductByID);
productRouter.get("/get-allProduct", getAllProduct1);

//////////////////////////////////// CRUD
productRouter.get("/get-product", getProduct);
productRouter.post("/create-product", createProduct);
productRouter.post("/update-product/:id", updateProduct);
productRouter.post("/delete-product/:id", deleteProduct);

//
productRouter.get("/get-product-information", getProductInformation);
productRouter.post("/create-product-information", createProductInformation);
productRouter.post("/update-product-information/:id", updateProductInformation);
//  productRouter.post('/get-product-information', getProductInformation);

///
productRouter.get("/get-product-variants", getProductVariants);
productRouter.post("/create-product-variants", createProductVariants);
productRouter.post("/update-product-variants/:id", updateProductVariants);
productRouter.post("/delete-product-variants/:id", deleteProductVariants);

//
export default productRouter;
