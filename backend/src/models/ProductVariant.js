import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ProductVariant extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_productVariant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id_product'
      }
    },
    id_color: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Color',
        key: 'id_color'
      }
    },
    id_rom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Rom',
        key: 'id_rom'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'ProductVariant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_productVariant" },
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
        name: "id_color",
        using: "BTREE",
        fields: [
          { name: "id_color" },
        ]
      },
      {
        name: "id_rom",
        using: "BTREE",
        fields: [
          { name: "id_rom" },
        ]
      },
    ]
  });
  }
}
