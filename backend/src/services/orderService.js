import initModels from "../models/init-models.js";
import { sequelize } from "../config/database.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

let model = initModels(sequelize);
export const getCartService = async (id_user) => {
  // ai la nguoi dat ==> Có cart ==> cart item từ cart ==>
  try {
    const cart = await model.Cart.findOne({
      where: { id_user: id_user },
      include: [
        {
          model: CartItem,
          as: "CartItems",
          include: [
            {
              model: Product,
              as: "id_product_Product",
            },
          ],
        },
      ],
    });
    if (!cart || cart.CartItems.length === 0) {
      return { message: "Cart items not found" };
    }
    let totalAmount = 0;
    cart.CartItems.forEach(async (item) => {
      totalAmount += item.price * item.quantity;
    });
  } catch (error) {
    throw error;
  }
};

export const orderService = async (id_user, orderData) => {
  const { name, phone, address } = orderData;

  try {
    let total = 0;
    let discount = 0;

    //
    const Cart = await model.Cart.findAll({
      where: { id_user: id_user },
      include: [
        {
          model: model.CartItem,
          as: "CartItems",
          include: [
            {
              model: model.Product,
              as: "id_product_Product",
            },
          ],
        },
      ],
    });
    if (!Cart) throw new Error("Cart item not found");
    Cart.forEach((item) => {
      item.forEach((item) => {});
    });
    console.log(total);
    return total;
  } catch (error) {
    throw error;
  }
};
