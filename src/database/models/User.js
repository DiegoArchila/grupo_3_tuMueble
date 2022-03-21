//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

//------------------------- Settings

//Set the Alias
const alias = "User";

//Sets the columns
const cols = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  dateBorn: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  genderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  pwd: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
};

//Sets configurations the from model or table
const config = {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: false,
};

//------------------------- Asignation
const User = sequelize.define(alias, cols, config);

//------------------------- Relationship

//------------------------- Init Model
const initModel = function () {
  return User;
};

//------------------------- Return
module.exports = initModel;
