import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Rom extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_rom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Rom',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_rom" },
        ]
      },
    ]
  });
  }
}
