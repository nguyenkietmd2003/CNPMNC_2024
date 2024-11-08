import express from "express";
import {
  addCart,
  deleteCartt,
  getCart,
  order,
} from "../controllers/OrderController.js";

const cartRouter = express.Router();
cartRouter.get("/get-cart/:id", getCart);
cartRouter.post("/delete-cart", deleteCartt);
cartRouter.post("/add-cart", addCart);

export default cartRouter;
