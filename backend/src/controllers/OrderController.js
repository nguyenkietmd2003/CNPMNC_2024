import {
  addCartService,
  decreaseCartService,
  deleteCartService,
  getAllOrderService,
  getCartService,
  getMyOrderService,
  increaseCartService,
  orderService,
} from "../services/orderService.js";

export const getMyOrder = async (req, res) => {
  const { id_user } = req.params;
  try {
    const data = await getMyOrderService(id_user);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const data = await getAllOrderService();
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const order = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, total, products } = req.body;
  const data = { name, phone, address, total, products };
  try {
    const result = await orderService(id, data);
    return res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "error:" + error.message });
  }
};
export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getCartService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCartt = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await deleteCartService(id);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addCart = async (req, res) => {
  try {
    const {
      id_user,
      id_product,
      quantity,
      price,
      discount,
      id_productVariant,
    } = req.body;
    const data = {
      id_user,
      id_product,
      quantity,
      price,
      discount,
      id_productVariant,
    };
    const result = await addCartService(data);
    return res.status(200).json({ status: 200, message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const decreaseCart = async (req, res) => {
  const { id_cartItem } = req.params;
  try {
    const data = await decreaseCartService(id_cartItem);
    return res.status(200).json({ status: 200, data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const increaseCart = async (req, res) => {
  const { id_cartItem } = req.params;
  try {
    const data = await increaseCartService(id_cartItem);
    return res.status(200).json({ status: 200, data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
