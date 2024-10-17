import {
  createColorService,
  createProductReviewService,
  createRomService,
  deleteColorService,
  deleteProductReviewService,
  deleteRomService,
  getAllColorService,
  getAllRomService,
  getProductReviewService,
  updateColorService,
  updateProductReviewService,
  updateRomservice,
} from "../services/variantService.js";

export const getAllRom = async (req, res) => {
  try {
    const data = await getAllRomService();
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createRom = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await createRomService(name);
    return res.status(201).json({ status: 201, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteRom = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteRomService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateRom = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await updateRomservice(name, id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllColor = async (req, res) => {
  try {
    const data = await getAllColorService();
    if (!data)
      return res.status(404).json({ status: 404, message: data.message });
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAllColor = async (req, res) => {
  const { name, img } = req.body;
  try {
    const data = await createColorService(name, img);
    return res.status(201).json({ status: 201, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteColor = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await deleteColorService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateColor = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await updateColorService(id, data);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductReview = async (req, res) => {
  try {
    const data = await getProductReviewService();
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createProductReview = async (req, res) => {
  const { idProduct, idUser } = req.body;

  try {
    const data = await createProductReviewService(idProduct, idUser);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateProductReview = async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  console.log(data);
  try {
    const result = await updateProductReviewService(id, data);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteProductReview = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteProductReviewService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
