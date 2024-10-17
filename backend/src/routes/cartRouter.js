import express from "express";
import { getCart, order } from "../controllers/OrderController.js";

const cartRouter = express.Router();
cartRouter.get("/get-cart/:id", getCart);
cartRouter.post("/order/:id", order);

export default cartRouter;
