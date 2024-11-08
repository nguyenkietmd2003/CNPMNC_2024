import Category from "../models/Category.js";
import TagCategory from "../models/TagCategory.js";
import initModels from "./../models/init-models.js";
import { sequelize } from "./../config/database.js";

let model = initModels(sequelize);

//
export const getCategoryService = async () => {
  try {
    const data = await model.Category.findAll();
    if (!data) {
      throw Error("Couldn't find category");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (id, title, img, tag) => {
  try {
    const data = await model.Category.create({
      id_category: id,
      title,
      img,
      id_tag: tag,
    });
    if (!data) {
      throw Error("Couldn't create category");
    }
    return { message: "Create category successfully" };
  } catch (error) {
    throw error;
  }
};
export const getCategoryByTagService = async (id_tag) => {
  try {
    const data = await model.Category.findAll({
      where: { id_tag: id_tag },
    });
    if (!data) throw Error("Couldn't find category");
    return { message: data };
  } catch (error) {
    throw error;
  }
};
