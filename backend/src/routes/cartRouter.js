import express from "express";
import {
  addCart,
  decreaseCart,
  deleteCartt,
  getCart,
  increaseCart,
  order,
} from "../controllers/OrderController.js";

const cartRouter = express.Router();
cartRouter.get("/get-cart/:id", getCart);
cartRouter.post("/delete-cart", deleteCartt);
cartRouter.post("/add-cart", addCart);
cartRouter.post("/increase/:id_cartItem", increaseCart);
cartRouter.post("/decrease/:id_cartItem", decreaseCart);

export default cartRouter;
