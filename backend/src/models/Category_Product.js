import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Category_Product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id_category'
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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Category_Product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
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
        name: "id_category",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });
  }
}
