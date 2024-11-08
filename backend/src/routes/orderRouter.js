import express from "express";
import { order } from "../controllers/OrderController.js";

const orderRouter = express.Router();
/////////////////////////////////////// chuc nang chinh/////////////////
orderRouter.post("/order/:id", order);

//
export default orderRouter;
