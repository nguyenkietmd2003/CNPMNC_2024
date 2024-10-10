import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Color extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_color: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Color',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_color" },
        ]
      },
    ]
  });
  }
}
