import express from "express";
import {
  createCategory,
  getCategory,
  getCategoryByTag,
} from "../controllers/CategoryController.js";
const categoryRouter = express.Router();

/// CATEGORY
categoryRouter.get("/get-category", getCategory);
categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/get-category-byTag/:id_tag", getCategoryByTag);
////// TAG_CATEGORY
export default categoryRouter;
