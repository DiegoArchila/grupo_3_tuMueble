//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

//------------------------- Settings

//Set the Alias
const alias = "UserEmail";

//Sets the columns
const cols = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

//Sets configurations the from model or table
const config = {
  tableName: "usersEmails",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: false,
};

//------------------------- Asignation
const UserEmail = sequelize.define(alias, cols, config);

//------------------------- Relationship

//------------------------- Init Model
const initModel = function () {
  return UserEmail;
};

//------------------------- Return
module.exports = initModel;
