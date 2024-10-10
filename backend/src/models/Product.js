import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
  }
}
