import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Cart from  "./Cart.js";
import _CartItem from  "./CartItem.js";
import _Category from  "./Category.js";
import _Category_Product from  "./Category_Product.js";
import _Color from  "./Color.js";
import _Order from  "./Order.js";
import _OrderItem from  "./OrderItem.js";
import _Product from  "./Product.js";
import _ProductInformation from  "./ProductInformation.js";
import _ProductReview from  "./ProductReview.js";
import _ProductVariant from  "./ProductVariant.js";
import _Rom from  "./Rom.js";
import _TagCategory from  "./TagCategory.js";
import _Transaction from  "./Transaction.js";
import _User from  "./User.js";
import _UserReview from  "./UserReview.js";
import _VerificationCodes from  "./VerificationCodes.js";

export default function initModels(sequelize) {
  const Cart = _Cart.init(sequelize, DataTypes);
  const CartItem = _CartItem.init(sequelize, DataTypes);
  const Category = _Category.init(sequelize, DataTypes);
  const Category_Product = _Category_Product.init(sequelize, DataTypes);
  const Color = _Color.init(sequelize, DataTypes);
  const Order = _Order.init(sequelize, DataTypes);
  const OrderItem = _OrderItem.init(sequelize, DataTypes);
  const Product = _Product.init(sequelize, DataTypes);
  const ProductInformation = _ProductInformation.init(sequelize, DataTypes);
  const ProductReview = _ProductReview.init(sequelize, DataTypes);
  const ProductVariant = _ProductVariant.init(sequelize, DataTypes);
  const Rom = _Rom.init(sequelize, DataTypes);
  const TagCategory = _TagCategory.init(sequelize, DataTypes);
  const Transaction = _Transaction.init(sequelize, DataTypes);
  const User = _User.init(sequelize, DataTypes);
  const UserReview = _UserReview.init(sequelize, DataTypes);
  const VerificationCodes = _VerificationCodes.init(sequelize, DataTypes);

  CartItem.belongsTo(Cart, { as: "id_cart_Cart", foreignKey: "id_cart"});
  Cart.hasMany(CartItem, { as: "CartItems", foreignKey: "id_cart"});
  Category_Product.belongsTo(Category, { as: "id_category_Category", foreignKey: "id_category"});
  Category.hasMany(Category_Product, { as: "Category_Products", foreignKey: "id_category"});
  ProductVariant.belongsTo(Color, { as: "id_color_Color", foreignKey: "id_color"});
  Color.hasMany(ProductVariant, { as: "ProductVariants", foreignKey: "id_color"});
  OrderItem.belongsTo(Order, { as: "id_order_Order", foreignKey: "id_order"});
  Order.hasMany(OrderItem, { as: "OrderItems", foreignKey: "id_order"});
  Transaction.belongsTo(Order, { as: "id_order_Order", foreignKey: "id_order"});
  Order.hasMany(Transaction, { as: "Transactions", foreignKey: "id_order"});
  CartItem.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(CartItem, { as: "CartItems", foreignKey: "id_product"});
  Category_Product.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(Category_Product, { as: "Category_Products", foreignKey: "id_product"});
  OrderItem.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(OrderItem, { as: "OrderItems", foreignKey: "id_product"});
  ProductInformation.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(ProductInformation, { as: "ProductInformations", foreignKey: "id_product"});
  ProductReview.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(ProductReview, { as: "ProductReviews", foreignKey: "id_product"});
  ProductVariant.belongsTo(Product, { as: "id_product_Product", foreignKey: "id_product"});
  Product.hasMany(ProductVariant, { as: "ProductVariants", foreignKey: "id_product"});
  CartItem.belongsTo(ProductVariant, { as: "id_productVariant_ProductVariant", foreignKey: "id_productVariant"});
  ProductVariant.hasMany(CartItem, { as: "CartItems", foreignKey: "id_productVariant"});
  OrderItem.belongsTo(ProductVariant, { as: "id_productVariant_ProductVariant", foreignKey: "id_productVariant"});
  ProductVariant.hasMany(OrderItem, { as: "OrderItems", foreignKey: "id_productVariant"});
  ProductVariant.belongsTo(Rom, { as: "id_rom_Rom", foreignKey: "id_rom"});
  Rom.hasMany(ProductVariant, { as: "ProductVariants", foreignKey: "id_rom"});
  Category.belongsTo(TagCategory, { as: "id_tag_TagCategory", foreignKey: "id_tag"});
  TagCategory.hasMany(Category, { as: "Categories", foreignKey: "id_tag"});
  Cart.belongsTo(User, { as: "id_user_User", foreignKey: "id_user"});
  User.hasMany(Cart, { as: "Carts", foreignKey: "id_user"});
  Order.belongsTo(User, { as: "id_user_User", foreignKey: "id_user"});
  User.hasMany(Order, { as: "Orders", foreignKey: "id_user"});
  Transaction.belongsTo(User, { as: "id_user_User", foreignKey: "id_user"});
  User.hasMany(Transaction, { as: "Transactions", foreignKey: "id_user"});
  VerificationCodes.belongsTo(User, { as: "id_user_User", foreignKey: "id_user"});
  User.hasMany(VerificationCodes, { as: "VerificationCodes", foreignKey: "id_user"});
  ProductReview.belongsTo(UserReview, { as: "id_userReview_UserReview", foreignKey: "id_userReview"});
  UserReview.hasMany(ProductReview, { as: "ProductReviews", foreignKey: "id_userReview"});

  return {
    Cart,
    CartItem,
    Category,
    Category_Product,
    Color,
    Order,
    OrderItem,
    Product,
    ProductInformation,
    ProductReview,
    ProductVariant,
    Rom,
    TagCategory,
    Transaction,
    User,
    UserReview,
    VerificationCodes,
  };
}
