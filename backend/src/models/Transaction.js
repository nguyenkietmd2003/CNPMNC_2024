import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Transaction extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_transaction: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
        id_user: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "User",
            key: "id_user",
          },
        },
        id_order: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Order",
            key: "id_order",
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
        tableName: "Transaction",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id_transaction" }],
          },
          {
            name: "id_user",
            using: "BTREE",
            fields: [{ name: "id_user" }],
          },
          {
            name: "id_order",
            using: "BTREE",
            fields: [{ name: "id_order" }],
          },
        ],
      }
    );
  }
}
