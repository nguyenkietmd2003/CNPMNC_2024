import {
  createProductInformationService,
  createProductService,
  createProductVariantsService,
  deleteProductService,
  deleteProductVariantsService,
  getAllProductByCategoryservice,
  getAllProductByTagservice,
  getProductByIDService,
  getProductInformationService,
  getProductService,
  getProductVariantsService,
  updateProductInformationService,
  updateProductService,
  updateProductVariantsService,
} from "../services/productService.js";

export const getProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getProductByIDService(id);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>> check product", error.message);
    if (error.message === "Product not found") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
export const getProductByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAllProductByCategoryservice(id);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>> check product", error.message);
    if (error.message === "Product not found") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export const getProductByTag = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAllProductByTagservice(id);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>> check product", error.message);
    if (error.message === "Product not found") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getProduct = async (req, res) => {
  try {
    const result = await getProductService();
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>> check product");
    if (error.message === "Product not found") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
export const createProduct = async (req, res) => {
  const { id, title, summary, discount, category } = req.body;
  const product = { id, title, summary, discount, category };
  try {
    const data = await createProductService(product);
    return res.status(201).json({ status: 201, message: data });
  } catch (error) {
    console.log(">>>check create product");
    if (error.message === "Couldn't create product") {
      return res.status(400).json({ status: 404, message: error.message });
    }
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { ...updateProduct } = req.body;
  const update = { id, updateProduct };
  try {
    const result = await updateProductService(update);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>> check update product", error.message);
    if (error.message === "Couldn't update product") {
      return res.status(400).json({ status: 404, message: error.message });
    }
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await deleteProductService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    console.log(">>< check delete product", error.message);
    if (error.message === "Couldn't delete product") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
//----------------------------------------------------------------

export const getProductInformation = async (req, res) => {
  try {
    const result = await getProductInformationService();
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>check getProductInformation failed: " + error.message);
    if (error.message === "No Product Information") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export const createProductInformation = async (req, res) => {
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
  } = req.body;

  const data = {
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
  };
  try {
    const result = await createProductInformationService(data, 104); // Giả sử bạn có một hàm createProduct
    return res.status(201).json({ status: 201, message: result });
  } catch (error) {
    console.log(">>>> check createProductInformation failed: " + error.message);
    if (error.message === "Product information cannot be created") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
export const updateProductInformation = async (req, res) => {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
    const result = await updateProductInformationService(id, data);
    return res.status(200).json({ status: 200, message: result.data });
  } catch (error) {
    console.log(">>> check updateProductInformation", error.message);
  }
};

export const getProductVariants = async (req, res) => {
  try {
    const result = await getProductVariantsService();
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>> check getProductVariants", error.message);
  }
};

export const createProductVariants = async (req, res) => {
  const { id_product, id_color, id_rom, price } = req.body;
  const data = { id_product, id_color, id_rom, price };
  try {
    const result = await createProductVariantsService(data);
    return res.status(201).json({ status: 201, message: result });
  } catch (error) {
    console.log(">>> check createProductVariant", error.message);
    if (error.message === "Product variant cannot be created") {
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export const updateProductVariants = async (req, res) => {
  const { id } = req.params;
  const { id_product, id_color, id_rom, price } = req.body;
  const data = { id_product, id_color, id_rom, price };
  try {
    const result = await updateProductVariantsService(id, data);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>check updateProductVariants", error.message);
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const deleteProductVariants = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductVariantsService(id);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    console.log(">>>deleteProductVariants", error.message);
    res.status(500).json({ status: 500, message: error.message });
  }
};
