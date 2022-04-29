//------------------------- Settings
const UserPhone = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserPhone";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    notes: {
      type: DataTypes.STRING(250),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersPhones",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  model.associate = function (models) {

    model.belongsTo(models.PhoneCategory, {
      as: "category",
      foreignKey: "categoryId",
    });

    model.belongsTo(models.User, {
      as: "phones",
      foreignKey: "userId",
    });

  };

  //------------------------- Return
  return model;

};

module.exports = UserPhone;