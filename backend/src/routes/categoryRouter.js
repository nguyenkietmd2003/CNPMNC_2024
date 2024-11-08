import express from "express";
import {
  createCategory,
  getCategory,
  getCategoryByTag,
} from "../controllers/CategoryController.js";
const categoryRouter = express.Router();

/// CATEGORY
categoryRouter.get("/get-category", getCategory);
categoryRouter.get("/get-category-byTag/:id_tag", getCategoryByTag);
categoryRouter.post("/create-category", createCategory);
////// TAG_CATEGORY
export default categoryRouter;
