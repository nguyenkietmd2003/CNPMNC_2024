import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class OrderItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_orderItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'id_order'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id_product'
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
    tableName: 'OrderItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_orderItem" },
        ]
      },
      {
        name: "id_order",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
      {
        name: "id_product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "fk_order_variant",
        using: "BTREE",
        fields: [
          { name: "id_productVariant" },
        ]
      },
    ]
  });
  }
}
