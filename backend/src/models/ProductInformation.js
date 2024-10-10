import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class ProductInformation extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_productInformation: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        brand: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        operating_System: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        ram: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        screen: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        model: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        rom: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        CPU: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        battery: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        content: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        id_product: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Product",
            key: "id_product",
          },
        },
        hot: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
        img: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        is_delete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "ProductInformation",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id_productInformation" }],
          },
          {
            name: "id_product",
            using: "BTREE",
            fields: [{ name: "id_product" }],
          },
        ],
      }
    );
  }
}
