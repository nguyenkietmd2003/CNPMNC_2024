import { sequelize } from "../config/database.js";
import initModels from "../models/init-models.js";
import Product from "../models/Product.js";
import crypto from "crypto";
import Category from "../models/Category.js";
import Category_Product from "../models/Category_Product.js";
import { Op } from "sequelize";
import TagCategory from "../models/TagCategory.js";

//
let modell = initModels(sequelize);

///////////////////////////////////////////////////////// Chuc Nang Chinh/////////////////////////////////////////////////////////////////////////////////
export const getAllProductService = async () => {
  try {
    const data = await modell.Product.findAll();
    if (!data && !data.length) return [];
    return { message: data };
  } catch (error) {
    throw error;
  }
};
export const getProductByIDService = async (id) => {
  try {
    const data = await modell.Product.findOne({
      where: { id_product: id },
      include: [
        {
          model: modell.ProductInformation,
          as: "ProductInformations",
        },
        {
          model: modell.ProductVariant,
          as: "ProductVariants",
          include: [
            {
              model: modell.Color,
              as: "id_color_Color",
            },
            {
              model: modell.Rom,
              as: "id_rom_Rom",
            },
          ],
        },
        {
          model: modell.ProductReview,
          as: "ProductReviews",
          include: [
            {
              model: modell.UserReview,
              as: "id_userReview_UserReview",
            },
          ],
        },
      ],
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const data = await modell.Product.findAll();
    if (!data) {
      throw Error("No Data found");
    }
    return { data: data, message: "Get all product successfully" };
  } catch (error) {
    throw error;
  }
};

export const getAllProductByCategoryservice = async (categoryId) => {
  try {
    const products = await modell.Product.findAll({
      include: [
        {
          model: Category_Product,
          as: "Category_Products",
          where: { id_category: categoryId },
          include: [
            {
              model: Category,
              as: "id_category_Category",
            },
          ],
        },
      ],
    });

    return products; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
};

export const getAllProductByTagservice = async (id_tag) => {
  try {
    // Lấy tất cả categories có id_tag
    const categories = await modell.Category.findAll({
      include: {
        model: TagCategory,
        where: { id_tag: id_tag },
        as: "id_tag_TagCategory",
      },
    });

    // Lấy danh sách id_category từ kết quả
    const id_categories = categories.map((category) => category.id_category);

    // Kiểm tra giá trị của id_categories

    // Lấy tất cả products theo id_category
    const products = await Product.findAll({
      include: [
        {
          model: Category_Product,
          as: "Category_Products",
          where: { id_category: { [Op.in]: id_categories } }, // Sử dụng Op.in để tìm sản phẩm theo nhiều category
        },
      ],
    });

    return products; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
};

export const getProductService = async () => {
  try {
    const data = await modell.Product.findAll();
    if (!data) {
      throw Error("Couldn't find product");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const createProductService = async (data) => {
  const { id, title, summary, discount, category } = data;
  try {
    const product = await modell.Product.create({
      id_product: id,
      title,
      summary,
      discount,
      id_category: category,
    });
    if (!product) {
      throw Error("Couldn't create product");
    }
    return { message: "Product created successfully" };
  } catch (error) {
    throw error;
  }
};
export const deleteProductService = async (id_product) => {
  console.log(">> check from service", id_product);
  try {
    const setDeleteProduct = await modell.Product.update(
      { is_delete: true },
      { where: { id_product } }
    );
    if (!setDeleteProduct) throw Error("Couldn't update product");
    const setDeleteVariant = await modell.ProductVariant.update(
      {
        is_delete: true,
      },
      { where: { id_product } }
    );
    if (!setDeleteVariant) throw Error("Couldn't update product variant");
    const setDeleteReview = await modell.ProductReview.update(
      {
        is_delete: true,
      },
      { where: { id_product } }
    );
    if (!setDeleteReview) throw Error("Couldn't update product Review");
    const setDeleteCartItem = await modell.CartItem.update(
      {
        is_delete: true,
      },
      { where: { id_product } }
    );
    if (!setDeleteCartItem) throw Error("Couldn't update product CartItem");
    const setDeleteProductCategory = await modell.Category_Product.update(
      {
        is_delete: true,
      },
      { where: { id_product } }
    );
    if (!setDeleteProductCategory)
      throw Error("Couldn't update product Category Product");
    if (!setDeleteCartItem) throw Error("Couldn't update product CartItem");
    const setDeleteProductInfomation = await modell.ProductInformation.update(
      {
        is_delete: true,
      },
      { where: { id_product } }
    );
    if (!setDeleteProductInfomation)
      throw Error("Couldn't update product Category Product");

    return { message: "Product deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (data) => {
  const { id, ...updateProduct } = data;
  try {
    const checkId = await modell.Product.findOne({
      where: { id_product: id },
    });
    if (!checkId) throw new Error("Product not found");

    // Lấy đối tượng bên trong updateProduct
    const updateData = updateProduct.updateProduct;

    const result = await modell.Product.update(updateData, {
      where: { id_product: id },
    });

    // Kiểm tra kết quả update
    if (!result[0]) {
      // result[0] chứa số lượng bản ghi bị ảnh hưởng
      throw new Error("Couldn't update product");
    }

    const updatedProduct = await modell.Product.findOne({
      where: { id_product: id },
    });

    return { message: updatedProduct };
  } catch (error) {
    throw error;
  }
};
export const getProductInformationService = async () => {
  try {
    const data = await modell.ProductInformation.findAll();
    if (!data) throw new Error("No Product Information");
    return { data: data, message: "Get Product Information successfully" };
  } catch (error) {
    throw error;
  }
};
export const createProductInformationService = async (data, id) => {
  const {
    brand,
    operating_System,
    ram,
    screen,
    model,
    rom,
    CPU,
    battery,
    content,
    id_product,
    hot,
    createdAT,
    img,
    is_delete,
  } = data;
  const product = await modell.Product.findOne({ where: { id_product: id } });
  if (!product) {
    throw new Error("Product not found");
  }

  const { title, summary } = product;
  try {
    let hexID;
    let existingUser;

    do {
      hexID = crypto.randomInt(1, 9999);
      existingUser = await modell.ProductInformation.findOne({
        where: { id_productInformation: hexID },
      });
    } while (existingUser);
    //
    const result = await modell.ProductInformation.create({
      id_productInformation: hexID,
      brand: brand,
      operating_System,
      ram,
      screen,
      model,
      rom,
      CPU,
      battery,
      content,
      id_product,
      hot,
      createdAT,
      img,
      is_delete,
      title,
      summary,
    });
    if (!result) throw new Error("Product information cannot be created");

    return {
      message: "Product information created successfully",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
export const updateProductInformationService = async (id, body) => {
  try {
    const data = await modell.ProductInformation.findOne({
      where: { id_productInformation: id },
    });
    if (!data) throw new Error("Product information not found");
    const result = await modell.ProductInformation.update(body, {
      where: { id_productInformation: id },
    });
    if (!result) throw new Error("Product information cannot be updated");
    return { message: "productInformation updated successfully", data: result };
  } catch (error) {
    throw error;
  }
};
export const getProductVariantsService = async () => {
  try {
    const data = await modell.ProductVariant.findAll();
    if (!data) throw new Error("No product variants");
    return { data: data, message: "Get product variants successfully" };
  } catch (error) {
    throw error;
  }
};
export const createProductVariantsService = async (data) => {
  const { id_product, id_color, id_rom, price } = data;

  try {
    let existingVariant;
    let hex;
    do {
      hex = crypto.randomInt(1, 9999);
      existingVariant = await modell.ProductVariant.findOne({
        where: { id_productVariant: hex },
      });
    } while (existingVariant);
    //

    const product = await modell.Product.findOne({
      where: { id_product },
    });
    if (!product) throw new Error("Product not found");
    const color = await modell.Color.findOne({
      where: { id_color },
    });
    if (!color) throw new Error("Color not found");
    const rom = await modell.Rom.findOne({
      where: { id_rom },
    });
    console.log(hex);
    if (!rom) throw new Error("Rom not found");
    const result = await modell.ProductVariant.create({
      id_productVariant: hex || null,
      id_product,
      id_color,
      id_rom,
      price,
      is_delete: false,
    });
    console.log(existingVariant);
    if (!result) throw new Error("Product variant cannot be created");
    const variant = await modell.ProductVariant.findOne({
      where: { id_productVariant: hex },
    });
    console.log(variant);
    return {
      message: "Product variant created successfully",
      data: variant,
    };
  } catch (error) {
    throw error;
  }
};
export const updateProductVariantsService = async (id, data) => {
  try {
    const { ...update } = data;
    console.log(id);
    const Variant = await modell.ProductVariant.findOne({
      where: { id_productVariant: id },
    });
    if (!Variant) throw new Error("Product variant not found");
    const updatedProductVariant = await Variant.update(update, {
      where: { id_productVariant: id },
    });
    if (!updatedProductVariant)
      throw new Error("Product variant cannot update");
    return {
      message: "Product variant updated successfully",
      data: updatedProductVariant,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProductVariantsService = async (id) => {
  try {
    const checkID = await modell.ProductVariant.findOne({
      where: { id_productVariant: id },
    });
    if (!checkID) throw new Error("Product variant not found");
    const result = await modell.ProductVariant.update(
      { is_delete: true },
      { where: { id_productVariant: id } }
    );
    if (!result) throw new Error("Product variant cannot be deleted");

    // if (!result[0]) throw new Error("Product variant cannot be deleted");
    return { message: "Product variant deleted successfully" };
  } catch (error) {
    throw error;
  }
};
