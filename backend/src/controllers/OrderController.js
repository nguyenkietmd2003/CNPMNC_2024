import { getCartService, orderService } from "../services/orderService.js";

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
  const { name, phone, address } = req.body;
  const data = { name, phone, address };
  try {
    const result = await orderService(id, data);
    console.log(result);
    return res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
