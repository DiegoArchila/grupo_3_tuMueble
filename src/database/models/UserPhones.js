//------------------------- Imports
const { DataTypes } = require("sequelize");

//------------------------- Init Model
const initModel = function (sequelize) {
  
  //------------------------- Settings

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
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
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
  const UserPhone = sequelize.define(alias, cols, config);

  //------------------------- Relationship

  return UserPhone;
};

//------------------------- Return
module.exports = initModel;
