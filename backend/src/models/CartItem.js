import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CartItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_cartItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    createAT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id_product'
      }
    },
    id_cart: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cart',
        key: 'id_cart'
      }
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    id_productVariant: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductVariant',
        key: 'id_productVariant'
      }
    }
  }, {
    sequelize,
    tableName: 'CartItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cartItem" },
        ]
      },
      {
        name: "id_cart",
        using: "BTREE",
        fields: [
          { name: "id_cart" },
        ]
      },
      {
        name: "fk_2product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "fk_product_cartitem",
        using: "BTREE",
        fields: [
          { name: "id_productVariant" },
        ]
      },
    ]
  });
  }
}
