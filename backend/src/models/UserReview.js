import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserReview extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_userReview: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createAT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'UserReview',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_userReview" },
        ]
      },
    ]
  });
  }
}
