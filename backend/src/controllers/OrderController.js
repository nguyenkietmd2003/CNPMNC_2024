import {
  addCartService,
  deleteCartService,
  getCartService,
  orderService,
} from "../services/orderService.js";

export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getCartService(id);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const order = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, total, products } = req.body;
  const data = { name, phone, address, total, products };
  console.log(data);
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
