import initModels from "../models/init-models.js";
import { sequelize } from "../config/database.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

import crypto from "crypto";

//
let model = initModels(sequelize);
export const getCartService = async (id_user) => {
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
              include: [
                {
                  model: model.ProductVariant,
                  as: "ProductVariants",
                  include: [
                    {
                      model: model.Rom,
                      as: "id_rom_Rom",
                    },
                    {
                      model: model.Color,
                      as: "id_color_Color",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
      return {
        message: "Cart is empty",
        data: { id_cart: cart.id_cart },
        totalAmount: 0,
      };
    }

    let totalAmount = 0;
    cart.CartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    return { message: "Get cart successfully", data: cart, totalAmount };
  } catch (error) {
    throw error;
  }
};

export const orderService = async (id_user, orderData) => {
  const { name, phone, address, total, products } = orderData;
  //
  const generateUniqueOrderItemId = async () => {
    let hexOrderItem;
    let existOrderItem;
    do {
      hexOrderItem = crypto.randomInt(1, 9999); // Tạo một ID ngẫu nhiên trong khoảng từ 1 đến 9999
      existOrderItem = await model.OrderItem.findOne({
        where: { id_orderItem: hexOrderItem },
      });
    } while (existOrderItem);
    return hexOrderItem; // Trả về ID duy nhất
  };

  //
  try {
    let hex;
    let existOrder;
    do {
      hex = crypto.randomInt(1, 9999);
      existOrder = await model.Order.findOne({ where: { id_order: hex } });
    } while (existOrder);

    const newOrder = await model.Order.create({
      id_order: hex,
      name,
      phone,
      addresss: address,
      total,
      id_user,
      is_delete: false,
    });
    if (!newOrder) throw new Error("Failed to create Order");
    const orderID = newOrder.id_order;
    // const orderItems = products.map((product) => ({
    //   hex: {},
    //   id_order: orderID,
    //   id_product: product.id_product,
    // }));

    const orderItems = [];
    for (const product of products) {
      const uniqueId = await generateUniqueOrderItemId(); // Gọi hàm để lấy ID duy nhất
      orderItems.push({
        id_orderItem: uniqueId, // Sử dụng ID duy nhất
        id_order: orderID,
        id_product: product.id_product,
        is_delete: false,
      });
    }

    console.log(orderItems);
    const createItemOrder = await model.OrderItem.bulkCreate(orderItems);
    if (!createItemOrder) throw new Error("Failed to create ItemOrder");

    let hexTransaction;
    let exisTransaction;
    do {
      hexTransaction = crypto.randomInt(1, 9999);
      exisTransaction = await model.Transaction.findOne({
        where: { id_transaction: hexTransaction },
      });
    } while (exisTransaction);

    const transaction = await model.Transaction.create({
      id_transaction: hexTransaction,
      status: false,
      id_user,
      createdAT: "",
      id_order: orderID,
    });
    if (!transaction) return { message: "Failed Order" };
    const order = await model.OrderItem.findAll({
      where: { id_order: orderID },
      include: [
        {
          model: model.Product,
          as: "id_product_Product",
        },
        {
          model: model.Order,
          as: "id_order_Order",
        },
      ],
    });
    return { message: "Order successfully", data: order };
  } catch (error) {
    throw error;
  }
};

export const deleteCartService = async (id_user) => {
  try {
    const checkCart = await model.Cart.findOne({
      where: { id_user: id_user },
    });
    const deleteCartitem = await model.CartItem.destroy({
      where: { id_cart: checkCart.id_cart },
    });
    const deleteCart = await model.Cart.destroy({
      where: { id_user: id_user },
    });
    if (!deleteCart || !deleteCartitem) {
      throw new Error("Delete cart failed");
    }
    return { message: "Delete cart successfully" };
  } catch (error) {
    throw error;
  }
};
export const addCartService = async (data) => {
  const { id_user, id_product, quantity, price, discount, id_productVariant } =
    data;

  try {
    const getIDCart = await model.Cart.findOne({
      where: { id_user: id_user },
    });
    let id_cart;
    if (getIDCart) id_cart = getIDCart?.id_cart;
    // Kiểm tra xem sản phẩm với biến thể cụ thể (màu sắc, dung lượng) đã có trong giỏ hàng chưa
    let cartItem = await model.CartItem.findOne({
      where: { id_cart, id_product, id_productVariant },
    });

    if (cartItem) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      cartItem.quantity += quantity;
      await cartItem.save();
      return { message: "Cart item updated", data: cartItem };
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      let hex;
      let existing;
      do {
        hex = crypto.randomInt(1, 9999);
        existing = await model.CartItem.findOne({
          where: { id_cartItem: hex },
        });
      } while (existing);

      // Tạo mới một mục trong giỏ hàng
      cartItem = await model.CartItem.create({
        id_cartItem: hex,
        id_cart: id_cart,
        id_product: id_product,
        quantity: quantity,
        price: price,
        discount: discount,
        createAT: null,
        id_productVariant,
        is_delete: false,
      });
      return { message: "Product added to cart", data: cartItem };
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    throw error;
  }
};
