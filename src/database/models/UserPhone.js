//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const UserPhone = (sequelize) => {
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
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
UserPhone.associations = function (models) {
  UserPhone.belongsTo(models.PhoneCategory, {
    as: "phonesCategory",
    foreignKey: "categoryId",
  });

  UserPhone.belongsTo(models.User, {
    as: "users",
    foreignKey: "userId",
  });
};

//------------------------- Return
module.exports = UserPhone;
