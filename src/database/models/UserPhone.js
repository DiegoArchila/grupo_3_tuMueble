//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

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
const UserPhone = sequelize.define(alias, cols, config);

//------------------------- Relationship

//------------------------- Init Model
const initModel = function () {
  return UserPhone;
};

//------------------------- Return
module.exports = initModel;
