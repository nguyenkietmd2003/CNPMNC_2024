import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/CategoryController.js";
const categoryRouter = express.Router();

/// CATEGORY
categoryRouter.get("/get-category", getCategory);
categoryRouter.post("/create-category", createCategory);
////// TAG_CATEGORY
export default categoryRouter;
