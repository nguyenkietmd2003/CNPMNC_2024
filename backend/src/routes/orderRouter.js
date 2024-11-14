import express from "express";
import {
  getAllOrder,
  getMyOrder,
  order,
} from "../controllers/OrderController.js";

const orderRouter = express.Router();
/////////////////////////////////////// chuc nang chinh/////////////////
orderRouter.post("/order/:id", order);
orderRouter.get("/get-order/:id_user", getMyOrder);
orderRouter.get("/get-allOrder", getAllOrder);

//
export default orderRouter;
