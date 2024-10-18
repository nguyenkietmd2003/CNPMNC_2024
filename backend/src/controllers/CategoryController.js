import {
  createCategoryService,
  getCategoryService,
} from "../services/categoryService.js";

export const getCategory = async (req, res) => {
  try {
    const result = await getCategoryService();
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    if (error.message === "Couldn't find category") {
      return res.status(400).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

//=======---------------------  TAG_CATEGORY
export const createCategory = async (req, res) => {
  const { id, title, img, tag } = req.body;
  try {
    const result = await createCategoryService(id, title, img, tag);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>> check createCategory: " + error.message);
    if (error.message === "Couldn't create category") {
      return res.status(400).json({ status: 404, message: error.message });
    } else
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
  }
};
