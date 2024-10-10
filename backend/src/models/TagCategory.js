import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class TagCategory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tag: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_tag: {
      type: DataTypes.ENUM('iphone','ipad','imac','airpod'),
      allowNull: false
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TagCategory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tag" },
        ]
      },
    ]
  });
  }
}
