import initModels from "../models/init-models.js";
import { sequelize } from "../config/database.js";
import crypto from "crypto";
import { where } from "sequelize";

let model = initModels(sequelize);

export const getAllRomService = async () => {
  try {
    const data = await model.Rom.findAll();
    if (!data) throw new Error("No Data found");
    return { data: data };
  } catch (error) {
    throw error;
  }
};
export const createRomService = async (name) => {
  let hex;
  let existingRom;
  try {
    do {
      hex = crypto.randomInt(1, 100);
      existingRom = await model.Rom.findOne({ where: { id_rom: hex } });
    } while (existingRom);
    const newRom = await model.Rom.create({
      id_rom: hex,
      name,
      is_delete: true,
    });
    if (!newRom) throw new Error("cannot create Rom");
    return { message: " create successfully", data: newRom };
  } catch (error) {
    throw error;
  }
};
export const updateRomservice = async (name, id) => {
  try {
    const data = await model.Rom.findOne({ where: { id_rom: id } });
    if (!data) throw new Error("Rom  not found");
    data.name = name;
    return { message: "udpate successfully", data: data };
  } catch (error) {
    throw error;
  }
};

export const deleteRomService = async (id) => {
  try {
    const data = await model.Rom.findOne({ where: { id_rom: id } });
    if (!data) throw new Error("Rom  not found");
    data.is_delete = true;
    return { message: "delete successfully", data: data };
  } catch (error) {
    throw error;
  }
};

export const getAllColorService = async () => {
  try {
    const data = await model.Color.findAll();
    if (!data) throw new Error("No Data");
    return { message: "get color successfully", data: data };
  } catch (error) {
    throw error;
  }
};

export const createColorService = async (name, img) => {
  try {
    let hex;
    let existingColor;

    do {
      hex = crypto.randomInt(1, 100);
      existingColor = await model.Color.findOne({ where: { id_color: hex } });
    } while (existingColor);
    const data = await model.Color.create({
      id_color: hex,
      name,
      img,
      is_delete: false,
    });
    if (!data) return { message: "create color failed", data: data };
    return { message: "create color successfully", data: data };
  } catch (error) {
    throw error;
  }
};

export const deleteColorService = async (id) => {
  try {
    const checkId = await model.Color.findOne({ where: { id_color: id } });
    if (!checkId) throw new Error("Color not found");
    const deleteColor = await model.Color.update(
      { is_delete: true },
      { where: { id_color: id } }
    );
    if (!deleteColor) throw new Error("Cant delete color");
    return { message: "delete color successfully", data: deleteColor };
  } catch (error) {
    throw error;
  }
};
export const updateColorService = async (id, param) => {
  try {
    const checkColor = await model.Color.findOne({
      where: { id_color: id },
    });
    if (!checkColor) throw new Error("Cant not find color");
    const data = await model.Color.update(param, {
      where: { id_color: id },
    });
    console.log(data);
    if (!data) throw new Error("Cant update color");
    return { message: "update color successfully", data: data };
  } catch (error) {
    throw error;
  }
};

export const getProductReviewService = async () => {
  try {
    const data = await model.ProductReview.findAll();
    if (!data) throw new Error("Cannot get product review");
    return { message: "get product review successfully", data: data };
  } catch (error) {
    throw error;
  }
};
export const createProductReviewService = async (idProduct, idUser) => {
  try {
    let hex;
    let existingReview;
    do {
      hex = crypto.randomInt(1, 100);
      existingReview = await model.ProductReview.findOne({
        where: { id_productReview: hex },
      });
    } while (existingReview);
    const createReview = await model.ProductReview.create({
      id_productReview: hex,
      createdAT: new Date(),
      public: 1,
      id_product: idProduct,
      id_userReview: idUser,
    });
    if (!createReview) throw new Error("Cannot create product review");
    return {
      message: "create product review successfully",
      data: createReview,
    };
  } catch (error) {
    throw error;
  }
};
export const updateProductReviewService = async (id, data) => {
  console.log(id);
  console.log(data);
  try {
    const result = await model.ProductReview.findOne({
      where: { id_productReview: id },
    });
    if (!result) throw new Error("Cannot find product review");
    const update = await model.ProductReview.update(
      {
        ...data,
      },
      { where: { id_productReview: id } }
    );
    if (!update) throw new Error("Cannot update product review");
    return { message: "update product review successfully", data: update };
  } catch (error) {
    throw error;
  }
};
export const deleteProductReviewService = async (id) => {
  try {
    const data = await model.ProductReview.findOne({
      where: { id_productReview: id },
    });
    if (!data) throw new Error("cannot find product review");
    const result = await data.update(
      {
        is_delete: true,
      },
      { where: { id_productReview: id } }
    );
    if (!result) throw new Error("Cannot delete product information");
    return { message: "delete product review successfully", data: result };
  } catch (error) {
    throw error;
  }
};
