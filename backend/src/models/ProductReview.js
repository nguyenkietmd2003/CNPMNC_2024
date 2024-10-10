import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class ProductReview extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_productReview: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        public: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
        id_product: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Product",
            key: "id_product",
          },
        },
        id_userReview: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "UserReview",
            key: "id_userReview",
          },
        },
        is_delete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "ProductReview",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id_productReview" }],
          },
          {
            name: "id_userReview",
            using: "BTREE",
            fields: [{ name: "id_userReview" }],
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
